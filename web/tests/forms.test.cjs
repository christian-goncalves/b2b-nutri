const { test } = require('node:test');
const assert = require('node:assert/strict');
const { generateKeyPairSync } = require('node:crypto');
const { Sheets } = require(process.env.FORMS_TEST_BUILD + '/sheets.js');
const { validate, persist, InvalidSubmission, NEWSLETTER_HEADERS, CONTACT_HEADERS } = require(process.env.FORMS_TEST_BUILD + '/submissions.js');

const newsletter = { email: ' Pessoa@Example.com ', consentimento: true, origem: 'home', website: '' };

class FakeFormStore {
  constructor(shared = { states: new Map(), limits: new Map() }) { this.shared = shared; }
  async claim(key, token) {
    const state = this.shared.states.get(key);
    if (!state) { this.shared.states.set(key, `pending:${token}`); return 'claimed'; }
    if (state === 'suppressed') return 'suppressed';
    if (state === 'active' || state === 'completed') return 'existing';
    return 'pending';
  }
  async complete(key, token, status = 'completed') {
    if (this.shared.states.get(key) !== `pending:${token}`) return false;
    this.shared.states.set(key, status); return true;
  }
  async release(key, token) {
    if (this.shared.states.get(key) !== `pending:${token}`) return false;
    this.shared.states.delete(key); return true;
  }
  async suppress(email) { this.shared.states.set(`newsletter:${email.trim().toLowerCase()}`, 'suppressed'); }
  async consumeRateLimit(ip, now) {
    const key = `${ip}:${Math.floor(now / 900000)}`;
    const count = (this.shared.limits.get(key) || 0) + 1;
    this.shared.limits.set(key, count); return count;
  }
}

function isolatedStore() { return new FakeFormStore(); }
test('validation checks consent, limits, invalid email and honeypot', () => {
  assert.equal(validate('newsletter', newsletter)[0], 'pessoa@example.com');
  for (const input of [{ ...newsletter, consentimento: false }, { ...newsletter, email: 'bad' }, { ...newsletter, website: 'spam' }, { ...newsletter, origem: 'x'.repeat(101) }]) assert.throws(() => validate('newsletter', input), InvalidSubmission);
  assert.throws(() => validate('contato', { nome: 'Nome', email: 'x@y.com', assunto: 'A', mensagem: 'x'.repeat(5001) }), InvalidSubmission);
});
test('persistence stops on existing, including suppressed email, and propagates failure', async () => {
  let writes = 0;
  const sheets = { verifyHeaders: async () => {}, emails: async () => ['pessoa@example.com'], append: async () => { writes++; } };
  assert.equal(await persist(sheets, 'newsletter', validate('newsletter', newsletter)), 'existing');
  assert.equal(writes, 0);
  sheets.verifyHeaders = async () => { throw Error('failure'); };
  await assert.rejects(persist(sheets, 'contato', ['x']));
  assert.equal(writes, 0);
});
test('Google adapter uses RAW, preserves formula text, checks headers and acknowledgement', async () => {
  const key = generateKeyPairSync('rsa', { modulusLength: 2048 }).privateKey.export({ type: 'pkcs8', format: 'pem' });
  const calls = [];
  const mock = async (url, init) => {
    calls.push([url, init]);
    if (url.includes('oauth2.googleapis.com')) return Response.json({ access_token: 'mock' });
    if (init.method === 'POST') return Response.json({ updates: { updatedRows: 1 } });
    return Response.json({ values: [CONTACT_HEADERS] });
  };
  const sheets = new Sheets({ spreadsheetId: 'fake', clientEmail: 'fake@example.com', privateKey: key }, mock);
  await sheets.verifyHeaders('Contato', CONTACT_HEADERS);
  await sheets.append('Contato', ['=1+1', 'a@b.com', '+test', '@test', 'date']);
  const [url, options] = calls.find(([url]) => url.includes(':append'));
  assert.match(url, /valueInputOption=RAW/);
  assert.equal(JSON.parse(options.body).values[0][0], '=1+1');
  await assert.rejects(sheets.verifyHeaders('Contato', NEWSLETTER_HEADERS));
  const broken = new Sheets({ spreadsheetId: 'fake', clientEmail: 'fake@example.com', privateKey: key }, async (url) => url.includes('oauth2') ? Response.json({ access_token: 'mock' }) : Response.json({ updates: {} }));
  await assert.rejects(broken.append('Contato', ['x']));
});

test('route refuses disabled, wrong origin, invalid data and unavailable configuration', async () => {
  const { handleSubmission } = require(process.env.FORMS_TEST_BUILD + '/handler.js');
  const old = { ...process.env };
  try {
    delete process.env.FORMS_ENABLED;
    const req = (body, origin = 'https://example.test') => new Request('https://example.test/api/newsletter', { method: 'POST', headers: { origin, 'x-real-ip': '192.0.2.10', 'content-type': 'application/json' }, body: JSON.stringify(body) });
    assert.equal((await handleSubmission(req(newsletter), 'newsletter')).status, 503);
    process.env.FORMS_ENABLED = 'true';
    process.env.FORMS_ALLOWED_ORIGIN = 'https://example.test';
    assert.equal((await handleSubmission(req(newsletter, 'https://other.test'), 'newsletter')).status, 403);
    const isolated = { store: isolatedStore(), sheets: { verifyHeaders: async () => {}, emails: async () => [], append: async () => {} }, sendEmail: async () => {} };
    assert.equal((await handleSubmission(req({ ...newsletter, consentimento: false }), 'newsletter', isolated)).status, 400);
    delete process.env.GOOGLE_SHEETS_ID;
    delete process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    delete process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    assert.equal((await handleSubmission(req(newsletter), 'newsletter')).status, 503);
  } finally {
    for (const key of ['FORMS_ENABLED', 'FORMS_ALLOWED_ORIGIN', 'GOOGLE_SHEETS_ID', 'GOOGLE_SERVICE_ACCOUNT_EMAIL', 'GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY', 'UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN']) {
      if (old[key] === undefined) delete process.env[key]; else process.env[key] = old[key];
    }
  }
});

test('isolated handler injects Sheets and SMTP and does not call either for rejected input', async () => {
  const { handleSubmission } = require(process.env.FORMS_TEST_BUILD + '/handler.js');
  process.env.FORMS_ENABLED = 'true';
  process.env.FORMS_ALLOWED_ORIGIN = 'https://example.test';
  let writes = 0;
  let emails = 0;
  const sheets = {
    verifyHeaders: async () => {},
    emails: async () => [],
    append: async () => { writes++; },
  };
  const adapters = { sheets, sendEmail: async () => { emails++; }, store: isolatedStore() };
  const req = (body, options = {}) => new Request('https://example.test/api/newsletter', {
    method: options.method || 'POST',
    headers: { origin: options.origin || 'https://example.test', 'x-real-ip': '192.0.2.1', 'content-type': options.contentType || 'application/json', ...(options.headers || {}) },
    body: options.raw ?? JSON.stringify(body),
  });
  assert.equal((await handleSubmission(req({ ...newsletter, website: 'bot' }), 'newsletter', adapters)).status, 400);
  assert.equal((await handleSubmission(req(newsletter, { contentType: 'text/plain' }), 'newsletter', adapters)).status, 415);
  assert.equal((await handleSubmission(req(newsletter, { raw: '{' }), 'newsletter', adapters)).status, 400);
  assert.equal((await handleSubmission(req(newsletter, { method: 'PUT' }), 'newsletter', adapters)).status, 405);
  assert.equal((await handleSubmission(req(newsletter, { origin: 'https://other.test' }), 'newsletter', adapters)).status, 403);
  assert.equal((await handleSubmission(req(newsletter, { raw: JSON.stringify(newsletter) + ' '.repeat(16385) }), 'newsletter', adapters)).status, 400);
  assert.equal(writes, 0);
  assert.equal(emails, 0);

  const response = await handleSubmission(req(newsletter), 'newsletter', adapters);
  assert.equal(response.status, 200);
  assert.equal(writes, 1);
  assert.equal(emails, 1);
});

test('SMTP failure after confirmed append is reported without a second append', async () => {
  const { handleSubmission } = require(process.env.FORMS_TEST_BUILD + '/handler.js');
  process.env.FORMS_ENABLED = 'true';
  process.env.FORMS_ALLOWED_ORIGIN = 'https://example.test';
  let writes = 0;
  const adapters = {
    sheets: { verifyHeaders: async () => {}, emails: async () => [], append: async () => { writes++; } },
    sendEmail: async () => { throw Error('simulated SMTP failure'); },
    store: isolatedStore(),
  };
  const request = new Request('https://example.test/api/newsletter', { method: 'POST', headers: { origin: 'https://example.test', 'x-real-ip': '192.0.2.2', 'content-type': 'application/json' }, body: JSON.stringify(newsletter) });
  const response = await handleSubmission(request, 'newsletter', adapters);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, emailSent: false });
  assert.equal(writes, 1);
});

test('shared-state adapter contract is atomic across independent instances, suppression is durable, and rate limit caps at five', async () => {
  const shared = { states: new Map(), limits: new Map() };
  const one = new FakeFormStore(shared);
  const two = new FakeFormStore(shared);
  const claims = await Promise.all([one.claim('newsletter:a@example.com', 'one'), two.claim('newsletter:a@example.com', 'two')]);
  assert.deepEqual(claims.sort(), ['claimed', 'pending']);
  await one.suppress('a@example.com');
  assert.equal(await two.claim('newsletter:a@example.com', 'three'), 'suppressed');
  const counts = await Promise.all(Array.from({ length: 6 }, () => one.consumeRateLimit('192.0.2.1', 1_800_000)));
  assert.equal(counts.filter(count => count <= 5).length, 5);
  assert.equal(Math.max(...counts), 6);
});

test('contact retries with the same idempotency key do not append or notify twice; a new key is accepted', async () => {
  const { handleSubmission } = require(process.env.FORMS_TEST_BUILD + '/handler.js');
  process.env.FORMS_ENABLED = 'true';
  process.env.FORMS_ALLOWED_ORIGIN = 'https://example.test';
  const store = isolatedStore();
  let writes = 0;
  let emails = 0;
  const adapters = {
    store,
    sheets: { verifyHeaders: async () => {}, emails: async () => [], append: async () => { writes++; } },
    sendEmail: async () => { emails++; },
  };
  const body = { nome: 'Pessoa Teste', email: 'pessoa@example.com', assunto: 'Teste', mensagem: 'Mensagem fictícia' };
  const req = key => new Request('https://example.test/api/contato', { method: 'POST', headers: { origin: 'https://example.test', 'x-real-ip': '192.0.2.3', 'content-type': 'application/json', 'idempotency-key': key }, body: JSON.stringify(body) });
  assert.equal((await handleSubmission(req('contact-key-123456'), 'contato', adapters)).status, 200);
  assert.equal((await handleSubmission(req('contact-key-123456'), 'contato', adapters)).status, 409);
  assert.equal((await handleSubmission(req('contact-key-654321'), 'contato', adapters)).status, 200);
  assert.equal(writes, 2);
  assert.equal(emails, 2);
});

test('sixth valid request from an IP is rejected before Sheets and SMTP', async () => {
  const { handleSubmission } = require(process.env.FORMS_TEST_BUILD + '/handler.js');
  process.env.FORMS_ENABLED = 'true';
  process.env.FORMS_ALLOWED_ORIGIN = 'https://example.test';
  const store = isolatedStore();
  let writes = 0;
  let emails = 0;
  const adapters = {
    store,
    sheets: { verifyHeaders: async () => {}, emails: async () => [], append: async () => { writes++; } },
    sendEmail: async () => { emails++; },
  };
  const req = email => new Request('https://example.test/api/newsletter', { method: 'POST', headers: { origin: 'https://example.test', 'x-real-ip': '192.0.2.4', 'content-type': 'application/json' }, body: JSON.stringify({ ...newsletter, email }) });
  for (let i = 0; i < 5; i++) assert.equal((await handleSubmission(req(`person${i}@example.com`), 'newsletter', adapters)).status, 200);
  const rejected = await handleSubmission(req('person5@example.com'), 'newsletter', adapters);
  assert.equal(rejected.status, 429);
  assert.equal(writes, 5);
  assert.equal(emails, 5);
});

test('ambiguous Sheets append timeout retains its claim and directs the caller to check the sheet', async () => {
  const { handleSubmission } = require(process.env.FORMS_TEST_BUILD + '/handler.js');
  process.env.FORMS_ENABLED = 'true';
  process.env.FORMS_ALLOWED_ORIGIN = 'https://example.test';
  const store = isolatedStore();
  let writes = 0;
  let emails = 0;
  const adapters = {
    store,
    sheets: { verifyHeaders: async () => {}, emails: async () => [], append: async () => { writes++; throw Error('simulated timeout after write'); } },
    sendEmail: async () => { emails++; },
  };
  const request = new Request('https://example.test/api/newsletter', { method: 'POST', headers: { origin: 'https://example.test', 'x-real-ip': '192.0.2.5', 'content-type': 'application/json' }, body: JSON.stringify(newsletter) });
  const first = await handleSubmission(request, 'newsletter', adapters);
  assert.equal(first.status, 503);
  assert.match((await first.json()).error, /Consulte a planilha/);
  const again = new Request('https://example.test/api/newsletter', { method: 'POST', headers: { origin: 'https://example.test', 'x-real-ip': '192.0.2.5', 'content-type': 'application/json' }, body: JSON.stringify(newsletter) });
  assert.equal((await handleSubmission(again, 'newsletter', adapters)).status, 409);
  assert.equal(writes, 1);
  assert.equal(emails, 0);
});

test('contact retention anonymizes only rows resolved at least twelve calendar months ago', async () => {
  const { anonymizeResolvedContacts } = require(process.env.FORMS_TEST_BUILD + '/retention.js');
  const changed = [];
  const sheets = {
    verifyHeaders: async (_sheet, headers) => assert.deepEqual(headers, CONTACT_HEADERS),
    contactsForRetention: async () => [
      { row: 2, resolvedAt: '2025-11-15T12:00:00.000Z' },
      { row: 3, resolvedAt: '2025-11-16T12:00:00.000Z' },
      { row: 4, resolvedAt: 'invalid-date' },
    ],
    anonymizeContact: async row => { changed.push(row); },
  };
  const count = await anonymizeResolvedContacts(sheets, new Date('2026-11-15T12:00:00.000Z'));
  assert.equal(count, 1);
  assert.deepEqual(changed, [2]);
});

test('newsletter unsubscribe token is signed, normalized, and rejects tampering', () => {
  const { createUnsubscribeToken, readUnsubscribeToken } = require(process.env.FORMS_TEST_BUILD + '/unsubscribe.js');
  process.env.FORMS_UNSUBSCRIBE_SECRET = 'test-secret-only';
  const token = createUnsubscribeToken(' Person@Example.com ');
  assert.equal(readUnsubscribeToken(token), 'person@example.com');
  assert.equal(readUnsubscribeToken(`${token.slice(0, -1)}x`), null);
  assert.equal(readUnsubscribeToken('bad-token'), null);
});
