const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const { UpstashFormStateStore, upstashConfig } = require(process.env.FORMS_TEST_BUILD + '/shared-kv.js');
const { Sheets, sheetsConfig } = require(process.env.FORMS_TEST_BUILD + '/sheets.js');
const { NEWSLETTER_HEADERS, CONTACT_HEADERS } = require(process.env.FORMS_TEST_BUILD + '/submissions.js');

async function main() {
  for (const name of ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN']) {
    if (!process.env[name]) throw new Error(`Missing required variable: ${name}`);
  }
  const config = upstashConfig();
  const first = new UpstashFormStateStore(config);
  const second = new UpstashFormStateStore(config);
  const id = randomUUID();
  const key = `integration-probe:${id}`;
  const [claimA, claimB] = await Promise.all([first.claim(key, 'instance-a'), second.claim(key, 'instance-b')]);
  assert.deepEqual([claimA, claimB].sort(), ['claimed', 'pending']);
  const winner = claimA === 'claimed' ? 'instance-a' : 'instance-b';
  assert.equal(await first.release(key, winner), true);

  const testIp = `integration-probe-${id}`;
  const counts = [];
  for (let i = 0; i < 6; i++) counts.push(await first.consumeRateLimit(testIp, Date.now()));
  assert.deepEqual(counts, [1, 2, 3, 4, 5, 6]);
  const sheets = new Sheets(sheetsConfig());
  try { await sheets.verifyHeaders('Newsletter', NEWSLETTER_HEADERS); }
  catch { throw new Error('Newsletter test-sheet headers do not match; no form rows were written'); }
  const contactHeader = await sheets.readHeaders('Contato', 'F');
  if (JSON.stringify(contactHeader) !== JSON.stringify(CONTACT_HEADERS) &&
      JSON.stringify(contactHeader.slice(0, 5)) === JSON.stringify(CONTACT_HEADERS.slice(0, 5)) && !contactHeader[5]) {
    await sheets.writeContactResolutionHeader();
  }
  try { await sheets.verifyHeaders('Contato', CONTACT_HEADERS); }
  catch { throw new Error('Contato test-sheet headers do not match; no form rows were written'); }
  process.stdout.write('Integration preflight passed: Upstash atomic claim and rate limit; Google Sheets headers verified.\n');
}

main().catch(error => {
  process.stderr.write(`Upstash integration failed: ${error.message}\n`);
  process.exitCode = 1;
});
