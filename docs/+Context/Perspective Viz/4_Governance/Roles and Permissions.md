## Role taxonomy
| role id | who uses it | default identity tier | core abilities | write-guard limits |
| ------- | ----------- | --------------------- | -------------- | ------------------ |
| `viewer` | read-only public | anon | open canvases, run simulations locally | none |
| `contributor` | most users | pseudo | add / edit weights, evidence; fork; open PR | 50 weight ops / h |
| `maintainer` | canvas owners, educators | pseudo / verified | merge PR, resolve conflicts, close abuse reports | 300 ops / h |
| `moderator` | elected by project | verified | quarantine users, tag probable fake evidence, adjust rate-limits | 500 ops / h |
| `admin` | self-host instance ops | verified | manage vault keys, rebuild search index, upgrade version | unlimited |

## Permission matrix
| action | viewer | contributor | maintainer | moderator | admin |
| ------ | ------ | ----------- | ---------- | --------- | ----- |
| open canvas | ✅ | ✅ | ✅ | ✅ | ✅ |
| run Monte-Carlo | ✅ | ✅ | ✅ | ✅ | ✅ |
| edit weight/evidence | ❌ | ✅ | ✅ | ✅ | ✅ |
| create fork | ❌ | ✅ | ✅ | ✅ | ✅ |
| open pull-request | ❌ | ✅ | ✅ | ✅ | ✅ |
| merge pull-request | ❌ | ❌ | ✅ | ✅ | ✅ |
| tag abuse / probable-fake | ❌ | ❌ | ✅ | ✅ | ✅ |
| quarantine user | ❌ | ❌ | ❌ | ✅ | ✅ |
| rotate encryption keys | ❌ | ❌ | ❌ | ❌ | ✅ |

**Observability** – all write‑guard breaches increment `rate_limit_violation_total`; see _Observability and Dev Ops.md_ for alert thresholds.

Rate-limits and credibility thresholds enforce _least-privilege_ even for admins; no one bypasses chain-hash integrity checks.

### Promotion / demotion flow
- **Auto**: reach `reputation ≥ 3` → UI prompts to request *maintainer*.
- **Human**: moderators vote (≥ 3) on promotion or demotion tickets.
- **Emergency lockout**: any moderator can freeze edits for 12 h pending review.

_All rules stored in `governance.yml`; PR to change them is itself governed by the matrix above._


Add metric name `rate_limit_violation_total` to Observability file, since rate limits are defined here.