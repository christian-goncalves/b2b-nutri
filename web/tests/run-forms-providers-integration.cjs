const { execFileSync, spawnSync } = require('node:child_process');
const { mkdtempSync, readFileSync, rmSync } = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const build = mkdtempSync(path.join(os.tmpdir(), 'b2b-nutri-form-providers-'));
const required = [
  'FORMS_ENABLED', 'FORMS_ALLOWED_ORIGIN', 'FORMS_TEST_RECIPIENT',
  'GOOGLE_SHEETS_ID', 'GOOGLE_SERVICE_ACCOUNT_EMAIL', 'GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY',
  'LARK_SMTP_USER', 'LARK_SMTP_PASSWORD', 'LARK_CONTACT_FROM', 'CONTACT_NOTIFICATION_TO', 'LARK_NEWSLETTER_FROM',
  'UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN', 'FORMS_UNSUBSCRIBE_SECRET',
];
try {
  const file = readFileSync(path.join(root, '.env.local'), 'utf8');
  for (const key of required) {
    const line = file.split(/\r?\n/).reverse().find(value => new RegExp(`^\\s*${key}\\s*=`).test(value));
    if (!line) throw new Error(`Missing required variable: ${key}`);
    process.env[key] = line.slice(line.indexOf('=') + 1).trim().replace(/^(?:"([\s\S]*)"|'([\s\S]*)')$/, (_, doubleQuoted, singleQuoted) => doubleQuoted ?? singleQuoted);
  }
  execFileSync(process.execPath, [
    path.join(root, 'node_modules/typescript/bin/tsc'), '--target', 'ES2022', '--module', 'commonjs', '--moduleResolution', 'node',
    '--lib', 'ES2022,DOM', '--esModuleInterop', '--skipLibCheck', '--strict', '--types', 'node', '--outDir', build,
    ...['handler', 'email', 'sheets', 'submissions', 'shared-kv', 'unsubscribe'].map(name => path.join(root, `lib/forms/${name}.ts`)),
  ], { cwd: root, stdio: 'inherit' });
  const env = Object.fromEntries(['PATH', 'FORMS_TEST_BUILD', ...required].map(name => [name, name === 'FORMS_TEST_BUILD' ? build : process.env[name]]));
  env.NODE_PATH = path.join(root, 'node_modules');
  const result = spawnSync(process.execPath, ['tests/forms.providers.integration.cjs'], { cwd: root, stdio: 'inherit', env });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} catch (error) {
  process.stderr.write(`Provider test setup failed: ${error.message}\n`);
  process.exitCode = 1;
} finally {
  rmSync(build, { recursive: true, force: true });
}
