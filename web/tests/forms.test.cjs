const { test } = require('node:test');
const assert = require('node:assert/strict');
const { generateKeyPairSync } = require('node:crypto');
const { Sheets } = require(process.env.FORMS_TEST_BUILD + '/sheets.js');
const { validate, persist, InvalidSubmission, NEWSLETTER_HEADERS, CONTACT_HEADERS } = require(process.env.FORMS_TEST_BUILD + '/submissions.js');

const newsletter = { email: ' Pessoa@Example.com ', consentimento: true, origem: 'home', website: '' };
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
    const req = (body, origin = 'https://example.test') => new Request('https://example.test/api/newsletter', { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: JSON.stringify(body) });
    assert.equal((await handleSubmission(req(newsletter), 'newsletter')).status, 503);
    process.env.FORMS_ENABLED = 'true';
    process.env.FORMS_ALLOWED_ORIGIN = 'https://example.test';
    assert.equal((await handleSubmission(req(newsletter, 'https://other.test'), 'newsletter')).status, 403);
    assert.equal((await handleSubmission(req({ ...newsletter, consentimento: false }), 'newsletter')).status, 400);
    delete process.env.GOOGLE_SHEETS_ID;
    delete process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    delete process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
    assert.equal((await handleSubmission(req(newsletter), 'newsletter')).status, 503);
  } finally {
    for (const key of ['FORMS_ENABLED', 'FORMS_ALLOWED_ORIGIN', 'GOOGLE_SHEETS_ID', 'GOOGLE_SERVICE_ACCOUNT_EMAIL', 'GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY']) {
      if (old[key] === undefined) delete process.env[key]; else process.env[key] = old[key];
    }
  }
});
