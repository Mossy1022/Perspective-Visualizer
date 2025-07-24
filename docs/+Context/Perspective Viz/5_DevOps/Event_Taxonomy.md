<!-- phase:1 --><!-- draft -->
# Event Taxonomy (v0.1)

| Event | Level | Payload keys |
|-------|-------|--------------|
| `weight_edit` | INFO | `agent_id`, `cell_id`, `old`, `new`, `loc_conf` |
| `snapshot_create` | INFO | `snapshot_id`, `parent_id`, `agent_id` |
| `rate_limit_violation` | WARN | `agent_id`, `rule`, `ts` |
| `evidence_prob_fake` | WARN | `evidence_id`, `score`, `agent_id` |
| `system_error` | ERROR | `stack`, `path`, `ts` |

Events shipped as newline JSON to stdout; Loki labels: `{app="perspectiveviz"}`.
