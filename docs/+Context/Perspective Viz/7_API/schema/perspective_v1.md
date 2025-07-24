"WeightCell": {
       "type": "object",
       "required": ["criterion_id","weight","loc_conf","updated_by","updated_at"],
       "properties": {
         "criterion_id": { "type": "string" },
         "weight":       { "type": "number", "minimum": -100, "maximum": 100 },
         "loc_conf":     { "type": "number", "minimum": 0, "maximum": 1 },
          "evidence_id":  { "type": "string" }
          "evidence_ids": { "type": "array", "items": { "type": "string" } },
          "evidence_id":  { "type": "string" },          // legacy – will be removed Phase 2
           "drilldown": {
           "type": "object",
           "required": ["snapshot_id","reducer"],
           "properties": {
           "snapshot_id": { "type": "string" },
           "reducer":     { "enum": ["sum","conf_weighted","pareto"] },
            "last_rollup": { "type": "number" }
        }
        },
        "rationale":    { "type": "string" }
       }
     }