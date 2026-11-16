const { execFileSync, spawnSync } = require('node:child_process');
const { mkdtempSync, rmSync } = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const build = mkdtempSync(path.join(os.tmpdir(), 'b2b-nutri-forms-'));
try {
  execFileSync(process.execPath, [
    path.join(root, 'node_modules/typescript/bin/tsc'),
    '--target', 'ES2022', '--module', 'commonjs', '--moduleResolution', 'node',
    '--lib', 'ES2022,DOM', '--esModuleInterop', '--skipLibCheck', '--strict',
    '--types', 'node', '--outDir', build,
    path.join(root, 'lib/forms/email.ts'), path.join(root, 'lib/forms/handler.ts'),
    path.join(root, 'lib/forms/sheets.ts'), path.join(root, 'lib/forms/submissions.ts'),
    path.join(root, 'lib/forms/shared-kv.ts'),
    path.join(root, 'lib/forms/retention.ts'),
    path.join(root, 'lib/forms/unsubscribe.ts'),
  ], { cwd: root, stdio: 'inherit' });
  const result = spawnSync(process.execPath, ['--test', path.join(root, 'tests/forms.test.cjs')], {
    cwd: root,
    stdio: 'inherit',
    env: { PATH: process.env.PATH, NODE_PATH: path.join(root, 'node_modules'), FORMS_TEST_BUILD: build },
  });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} finally {
  rmSync(build, { recursive: true, force: true });
}
