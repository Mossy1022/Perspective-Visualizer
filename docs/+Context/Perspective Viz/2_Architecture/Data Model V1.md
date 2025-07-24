## Scope
A **single JSON document** describes one **Perspective** snapshot.  
Everything on-screen – weights, evidence, edges, authorship – serialises to this tree.

## Top-level keys
| key          | type   | notes                                                                        |                                                                                |
| ------------ | ------ | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `meta`       | object | id, created_at (ISO-8601), parent_snapshot_id, fork_of_id, license_code      |                                                                                |
| `agent`      | object | `id`, `display_name`, `identity_tier` ('anon','pseudo','verified')           |                                                                                |
| `grid`       | array  | rows of **CriteriaRow** objects                                              |                                                                                |
| `edges`      | array  | causal **Edge** objects (Dimension 5)                                        |                                                                                |
| `evidence`   | array  | **EvidenceCard** objects referenced by rows and edges                        |                                                                                |
| `confidence` | number | 0-1 global certainty slider (Dimension 3)                                    |                                                                                |
| `emotion`    | object | `valence` −1…1, `arousal` 0-1 (Dimension 4)                                  |                                                                                |
| `badges`     | object | `reputation` 0-5 ⭐, `license` ('MIT','CC-BY-SA','PROPRIETARY') (Dimension 8) |                                                                                |
| `simulation` | object | null                                                                         | latest Monte-Carlo run metadata (seed, variance, histogram bins) (Dimension 9) |

## Weight Cell

| key            | type       | notes                                                       |
| -------------- | ---------- | ----------------------------------------------------------- |
| `criterion_id` | string     | e.g. `"long_term_cost"`                                     |
| `weight`       | number     | −100…100 (clamped by guard‑rail)                            |
| `loc_conf`     | number     | 0‑1 local confidence                                        |
| `evidence_ids` | string[] ? | zero‑to‑many FK values into `evidence` array                |
| `drilldown`    | object ?   | Nested sub‑snapshot (see table below)                       |
| `rationale`    | string ?   | Explain‑Back text (guard‑rail enforces non‑empty on commit) |
| `updated_by`   | string     | agent id                                                    |
| `updated_at`   | string     | ISO‑8601                                                    |

## drilldown object

|field|type|notes|
|---|---|---|
|`snapshot_id`|string|FK → another snapshot in the _same vault_. Immutable once written.|
|`reducer`|enum|`'sum'` \| `'conf_weighted'` \| `'pareto'` — deterministic roll‑up rule|
|`last_rollup`|number|Cached numeric value shown in the parent grid. Re‑computed on save.|

> **Depth guard‑rail:** clients clamp recursion at `3` unless the `nested_snapshots` feature‑flag is raised.


## CriteriaRow
| key         | type   | notes |
| ----------- | ------ | ----- |
| `option_id` | string | choice / stance label |
| `cells`     | array  | **WeightCell** objects |

### WeightCell
| key            | type    | notes |
| -------------- | ------- | ----- |
| `criterion_id` | string  | e.g. 'long_term_cost' |
| `weight`       | number  | −100…100, clamped by guard-rail |
| `loc_conf`     | number  | 0-1 local confidence |
| `evidence_id`  | string  | FK into `evidence` array |
| `updated_by`   | string  | agent id |
| `updated_at`   | string  | ISO-8601 |

## Edge  (Dimension 5)
| key            | type   | notes |
| -------------- | ------ | ----- |
| `from`         | object | `{option_id, criterion_id}` |
| `to`           | object | `{option_id, criterion_id}` |
| `strength`     | number | −1…1 |
| `evidence_id`  | string | FK |
| `confidence`   | number | 0-1 |

## EvidenceCard
| key             | type   | notes |
| --------------- | ------ | ----- |
| `id`            | string | sha256 hash |
| `title`         | string | short source name |
| `source_url`    | string | canonical link or doi |
| `cred_score`    | number | 0-1 from `credibility_rubric.json` |
| `mime`          | string | 'text/html','application/pdf',... |
| `added_by`      | string | agent id |
| `added_at`      | string | ISO-8601 |

## Validation
`schema/perspective_v1.json` (AJV) shipped in repo.  
PR CI rejects snapshots that fail validation or violate guard-rails.

## Example (minimal)
```json
{
  "meta":{"id":"snap_01","created_at":"2025-07-13T14:05:27Z","license_code":"MIT"},
  "agent":{"id":"u123","display_name":"Evan","identity_tier":"pseudo"},
  "grid":[
    {
      "option_id":"desalination",
      "cells":[
        {"criterion_id":"cost","weight":-32,"loc_conf":0.8,"evidence_id":"e1","updated_by":"u123","updated_at":"2025-07-13T14:05:00Z"}
      ]
    }
  ],
  "edges":[],
  "evidence":[
    {"id":"e1","title":"World Bank LCOE Study","source_url":"https://doi.org/...","cred_score":0.92,"mime":"application/pdf","added_by":"u123","added_at":"2025-07-13T14:04:55Z"}
  ],
  "confidence":0.62,
  "emotion":{"valence":0.1,"arousal":0.3},
  "badges":{"reputation":4.2,"license":"MIT"},
  "simulation":null
}
