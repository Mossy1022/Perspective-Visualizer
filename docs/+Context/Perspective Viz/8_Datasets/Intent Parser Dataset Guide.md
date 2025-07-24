**Goal**  
Provide a minimal open corpus so the MVP Intent Parser can reach the 80 % criterion‑detection KPI without proprietary data.

**Contents**

- 5 000 English sentences, balanced across domains: policy, product specs, opinion pieces, diary entries
    
- TSV columns: `sentence`, `criterion_span_start`, `criterion_span_end`, `criterion_label`
    
- Licence: CC‑BY‑4.0
    

**Annotation rules**

- tag only explicit _decision‑relevant_ phrases (‘battery life’, ‘long‑term cost’)
    
- ignore rhetorical fillers
    
- if multiple criteria in one phrase, split shortest disjoint spans
    

**Release process**

- pull request to `/dataset/` triggers CI lint (`no tabs`, `utf‑8`)
    
- merge bumps `dataset_version` in `intent_parser_config.json`


---

**Outcome map**

- 5 000‑row TSV (`datasets/intent_parser/dataset.tsv`) generated deterministically from a script so it can live in CI and be re‑seeded at will
    
- Baseline parser + scorer (no deps) proving ≥ 0.80 micro‑F1 against the TSV
    
- GitHub Actions workflow that fails the build if the score drops
    
- Integration test file exercising the full flow (dataset → train + score)

## Immediate priorities

- Ship **synthetic dataset generator** to unblock the KPI and let the rest of the stack compile.  
    – real human‑annotated data can replace it later without touching CI.
    
- Keep everything dependency‑free (pure Node fs + stdlib) to respect the repo’s zero‑deps rule.
    
- Make the generator idempotent (fixed RNG seed) so CI diffs stay clean.


