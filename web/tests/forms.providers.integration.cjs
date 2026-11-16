const { randomUUID } = require('node:crypto');
const { Sheets, sheetsConfig } = require(process.env.FORMS_TEST_BUILD + '/sheets.js');
const { UpstashFormStateStore, upstashConfig } = require(process.env.FORMS_TEST_BUILD + '/shared-kv.js');
const { handleSubmission } = require(process.env.FORMS_TEST_BUILD + '/handler.js');

async function main() {
  const recipient = process.env.FORMS_TEST_RECIPIENT?.trim().toLowerCase();
  const origin = process.env.FORMS_ALLOWED_ORIGIN;
  if (!recipient || !origin || process.env.FORMS_ENABLED !== 'true') throw new Error('Missing form integration configuration');
  const mismatch = [
    recipient !== 'dr.christianpereira@gmail.com' && 'FORMS_TEST_RECIPIENT',
    process.env.CONTACT_NOTIFICATION_TO !== 'contato@b2bnutris.com' && 'CONTACT_NOTIFICATION_TO',
    process.env.LARK_SMTP_USER !== 'contato@b2bnutris.com' && 'LARK_SMTP_USER',
  ].filter(Boolean);
  if (mismatch.length) throw new Error(`Approved address check failed for: ${mismatch.join(', ')}`);
  const sheets = new Sheets(sheetsConfig());
  const store = new UpstashFormStateStore(upstashConfig());
  await sheets.verifyHeaders('Newsletter', require(process.env.FORMS_TEST_BUILD + '/submissions.js').NEWSLETTER_HEADERS);
  await sheets.verifyHeaders('Contato', require(process.env.FORMS_TEST_BUILD + '/submissions.js').CONTACT_HEADERS);
  const existingEmails = await sheets.emails();

  const adapters = { sheets, store, sendEmail: require(process.env.FORMS_TEST_BUILD + '/email.js').sendSubmissionEmail };
  const id = randomUUID();
  const newsletterSkipped = existingEmails.includes(recipient);
  if (!newsletterSkipped) {
    const newsletterRequest = new Request(`${origin}/api/newsletter`, {
      method: 'POST',
      headers: { origin, 'x-real-ip': `198.51.100.${Math.floor(Math.random() * 200) + 1}`, 'content-type': 'application/json' },
      body: JSON.stringify({ email: recipient, consentimento: true, origem: `cp05-integracao-${id}`, website: '' }),
    });
    const newsletterResponse = await handleSubmission(newsletterRequest, 'newsletter', adapters);
    const newsletterResult = await newsletterResponse.json();
    if (newsletterResponse.status !== 200 || !newsletterResult.ok) throw new Error('Newsletter integration did not create a new test submission');
    await store.suppress(recipient);
    if (newsletterResult.emailSent !== true) throw new Error('Newsletter integration did not confirm SMTP acceptance; test address is suppressed');
  }

  const contactRequest = new Request(`${origin}/api/contato`, {
    method: 'POST',
    headers: { origin, 'x-real-ip': `203.0.113.${Math.floor(Math.random() * 200) + 1}`, 'content-type': 'application/json', 'idempotency-key': `contact-${id}` },
    body: JSON.stringify({ nome: 'Teste sintético CP-05', email: recipient, assunto: `CP-05 integração ${id}`, mensagem: `Mensagem sintética de validação. Identificador: ${id}.` }),
  });
  const contactResponse = await handleSubmission(contactRequest, 'contato', adapters);
  const contactResult = await contactResponse.json();
  if (contactResponse.status !== 200 || contactResult.emailSent !== true) throw new Error('Contact integration did not confirm SMTP acceptance');
  process.stdout.write(`Provider integration passed for synthetic run ${id}: contact row confirmed and SMTP accepted notification; newsletter ${newsletterSkipped ? 'skipped because the approved address is already registered' : 'row confirmed, welcome accepted, and test address suppressed'}.\n`);
}

main().catch(error => {
  process.stderr.write(`Provider integration stopped: ${error.message}\n`);
  process.exitCode = 1;
});
