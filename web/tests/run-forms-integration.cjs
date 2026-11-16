const { execFileSync, spawnSync } = require('node:child_process');
const { mkdtempSync, readFileSync, rmSync } = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const envFile = path.resolve(root, '.env.local');
const build = mkdtempSync(path.join(os.tmpdir(), 'b2b-nutri-forms-integration-'));
try {
  const file = readFileSync(envFile, 'utf8');
  const required = ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN', 'GOOGLE_SHEETS_ID', 'GOOGLE_SERVICE_ACCOUNT_EMAIL', 'GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY'];
  for (const key of required) {
    const line = file.split(/\r?\n/).find(value => new RegExp(`^\\s*${key}\\s*=`).test(value));
    if (!line) throw new Error(`Missing required variable: ${key}`);
    process.env[key] = line.slice(line.indexOf('=') + 1).trim().replace(/^(?:"([\s\S]*)"|'([\s\S]*)')$/, (_, doubleQuoted, singleQuoted) => doubleQuoted ?? singleQuoted);
  }
  execFileSync(process.execPath, [
    path.join(root, 'node_modules/typescript/bin/tsc'), '--target', 'ES2022', '--module', 'commonjs',
    '--moduleResolution', 'node', '--lib', 'ES2022,DOM', '--esModuleInterop', '--skipLibCheck', '--strict',
    '--types', 'node', '--outDir', build, path.join(root, 'lib/forms/shared-kv.ts'), path.join(root, 'lib/forms/sheets.ts'), path.join(root, 'lib/forms/submissions.ts'),
  ], { cwd: root, stdio: 'inherit' });
  const result = spawnSync(process.execPath, ['tests/forms.integration.cjs'], {
    cwd: root, stdio: 'inherit', env: Object.fromEntries(['PATH', 'NODE_PATH', 'FORMS_TEST_BUILD', ...required].map(name => [name, name === 'NODE_PATH' ? path.join(root, 'node_modules') : name === 'FORMS_TEST_BUILD' ? build : process.env[name]])),
  });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} catch (error) {
  process.stderr.write(`Integration setup failed: ${error.message}\n`);
  process.exitCode = 1;
} finally {
  rmSync(build, { recursive: true, force: true });
}
