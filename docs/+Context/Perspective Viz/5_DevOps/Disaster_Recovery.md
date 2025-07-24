<!-- phase:1 --><!-- draft -->
# Disaster‑Recovery & Back‑ups

| Asset | Backup cadence | RPO | RTO |
|-------|---------------|-----|-----|
| Postgres snapshots | hourly incremental + nightly full | ≤ 60 min | 2 h |
| Evidence bucket | real‑time replication to secondary region | ≤ 5 min | 4 h |
| Vault keys (client) | user‑held; not stored server‑side | N/A | User‑controlled |

Monthly restore drill checklist included in `/runbooks/restore.md`.
