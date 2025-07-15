// scripts/train_intent_parser.js
// @ts-check
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

/**
 * Very‑simple keyword matcher baseline.
 * Trains nothing – it just builds a map of criterion → phrases from the generator.
 * Scoring: micro‑averaged precision, recall, F1.
 */

const file = readFileSync(join('datasets/intent_parser', 'dataset.tsv'), 'utf8')
  .trim()
  .split('\n');

let tp = 0, fp = 0, fn = 0;

for (const line of file) {
  const [sentence, , , gold_label] = line.split('\t');

  // derive phrase list identical to generator
  const phrase_dict = {
    long_term_cost:   ['long‑term cost', 'total expenditure', 'lifetime expense'],
    battery_life:     ['battery life', 'runtime', 'charge duration'],
    equity:           ['equity', 'fairness', 'equal access'],
    carbon_footprint: ['carbon footprint', 'emissions', 'CO₂ output'],
    usability:        ['ease of use', 'usability', 'user friendliness'],
    risk:             ['structural risk', 'hazard', 'failure probability'],
    speed:            ['speed', 'throughput', 'processing time'],
    accuracy:         ['accuracy', 'precision', 'error rate'],
    resilience:       ['resilience', 'fault tolerance', 'robustness'],
    scalability:      ['scalability', 'growth capacity', 'ability to scale']
  };

  /** @type {string|null} */
  let predicted = null;
  for (const [label, phrases] of Object.entries(phrase_dict)) {
    if (phrases.some(p => sentence.includes(p))) { predicted = label; break; }
  }

  if (predicted === gold_label) tp++;
  else {
    if (predicted) fp++;
    fn++;
  }
}

const precision = tp / (tp + fp);
const recall    = tp / (tp + fn);
const f1        = 2 * precision * recall / (precision + recall);

const promLines =
  `intent_parser_hit{result="success"} ${tp}\n` +
  `intent_parser_hit{result="failure"} ${fp + fn}\n` +
  `intent_parser_f1 ${f1.toFixed(3)}\n`;
require('node:fs').writeFileSync('metrics.prom', promLines, 'utf8');

console.log(
  `intent_parser_hit{result="success"} ${tp}\n` +
  `intent_parser_hit{result="failure"} ${fp + fn}`
);

console.log(`Precision: ${precision.toFixed(3)}\nRecall:    ${recall.toFixed(3)}\nF1:        ${f1.toFixed(3)}`);


process.exitCode = f1 >= 0.80 ? 0 : 1;
