// @ts-check
const { writeFileSync, mkdirSync } = require('node:fs');
const { join } = require('node:path');

/**
 * RNG with fixed seed for reproducibility (Park–Miller 1988)
 * @param {number} seed
 * @returns {() => number} pseudo-random 0…1
 */
function mulberry32(seed) {
  return () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(42);

/** Domains used to vary sentence flavour. */
const domains = ['policy', 'product', 'opinion', 'diary', 'science'];

/** Criterion → paraphrases lookup. */
const criteria = {
  long_term_cost:   ['long-term cost', 'total expenditure', 'lifetime expense'],
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

/**
 * Make a sentence containing a given criterion phrase.
 * @param {string} domain
 * @param {string} criterion_key
 * @param {string} phrase
 * @returns {string}
 */
function synth_sentence(domain, criterion_key, phrase) {
  const templates = [
    `Considering ${phrase} will be critical for this ${domain} decision.`,
    `Stakeholders flagged ${phrase} as the top concern.`,
    `We cannot ignore ${phrase} if we want sustainable results.`,
    `${phrase} remains the decisive factor, experts say.`,
    `My diary reminds me that ${phrase} shaped my view today.`
  ];
  return templates[Math.floor(rand() * templates.length)];
}

const rows = [];
while (rows.length < 5000) {
  const crit_key   = Object.keys(criteria)[Math.floor(rand() * 10)];
  const phrase     = criteria[crit_key][Math.floor(rand() * 3)];
  const sentence   = synth_sentence(domains[Math.floor(rand() * 5)], crit_key, phrase);
  const span_start = sentence.indexOf(phrase);
  const span_end   = span_start + phrase.length;
  rows.push([sentence, span_start, span_end, crit_key].join('\t'));
}

const dir = 'datasets/intent_parser';
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, 'dataset.tsv'), rows.join('\n'), 'utf8');
writeFileSync(
  join(dir, 'README.md'),
  'Synthetic dataset (CC-BY-4.0) – regenerate via `node scripts/generate_intent_dataset.js`',
  'utf8'
);

console.log(`✔ 5 000 sentences written to ${dir}/dataset.tsv`);
