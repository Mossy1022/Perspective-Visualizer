// tests/intent_parser.integration.test.js
const assert = require('node:assert').strict;
const { spawnSync } = require('node:child_process');

/**
 * End‑to‑end check:
 * 1. (Re)generate dataset
 * 2. Train + score parser
 * 3. Fail if F1 < 0.80 (Phase‑1 KPI guard‑rail)
 */
(function run_integration_suite() {
  const gen = spawnSync('node', ['scripts/generate_intent_dataset.js']);
  assert.equal(gen.status, 0, 'Dataset generator failed');

  const train = spawnSync('node', ['scripts/train_intent_parser.js'], { encoding: 'utf8' });
  assert.equal(train.status, 0, 'Training script failed');

  const match = /F1:\s+([0-9.]+)/.exec(train.stdout);
  assert.ok(match, 'F1 not reported');
  const f1 = parseFloat(match[1]);
  assert.ok(f1 >= 0.80, `F1 ${f1} below KPI 0.80`);
  console.log(`✅ Intent Parser integration passed (F1 ${f1.toFixed(2)})`);
})();
