<!-- phase:1 --><!-- draft -->
# Persistence & Indexing

| Data class | Store | Retention | Index key |
|------------|-------|-----------|-----------|
| Perspective snapshot (`*.json`) | Postgres JSONB `perspectives` | 10 years (regulatory) | `(agent_id, created_at)` |
| Evidence blob (PDF, HTML) | `minio` bucket `evidence/` | Indefinite, subject to GDPR delete | `sha256` filename |
| Analytics event | Loki stream `events` | 30 days | `event_name` |
| Weight‑spam log | Postgres table `weight_spam` | 90 days | `(agent_id, ts)` |

| Layer                           | Backend Store                   | Retention | PK                                        |
| ------------------------------- | ------------------------------- | --------- | ----------------------------------------- |
| Perspective snapshot (`*.json`) | Postgres JSONB `perspectives`   | 10 years  | `(agent_id, created_at)`                  |
| Evidence blob …                 | …                               |           |                                           |
| **Drill‑down registry**         | Postgres table `snapshot_links` | 10 years  | `(parent_snapshot_id, child_snapshot_id)` |

*Schema migrations handled via **Atlas ORM** with `schema.sql` snapshots versioned under `/migrations`.*

### Backup
Daily `pg_dump` + `mc mirror` to off‑site bucket. See *Disaster_Recovery.md* for RPO/RTO numbers.


# Persistence & Data‑Retention

| Store | Tech | R/W Pattern | Default TTL | Backup |
|-------|------|------------|-------------|--------|
| **Local‑first Vault** | Browser IndexedDB (AES‑GCM encrypted) | read‑heavy, patch bursts | User‑controlled | none – user export |
| **Perspective DB** | Postgres 16 + `jsonb` | write‑once snapshots | *never* | nightly WAL‑shipping |
| **Evidence Blob Store** | S3‑compatible (`minio` in self‑host) | immutable blobs | *never* | versioned bucket |
| **Analytics Ingest** | ClickHouse | append‑only events | 180 days | weekly parquet dump |
| **Logs** | Loki | stream | 30 days | off‑site rsync |

## Retention Rules

1. **Snapshots are append‑only.**  
   Deletions create a tombstone object; hash chain remains intact.

2. **Evidence blobs** tagged `probable_fake=true` acquire a *quarantine* lifecycle:
   * not served to new clients,
   * deleted after **365 days** if not cleared.

3. **GDPR delete**  
   *Agent display names* are salted hashes; removing a user => wipe row in `agents` table, keep hash to avoid chain breaks.

## Self‑Host Defaults (`docker-compose`)

| Volume | Path | Size cap | Notes |
|--------|------|----------|-------|
| `vault_data` | `./data/vault` | 5 GB | IndexedDB persisted via `chrome‑stable` profile |
| `pg_data` | `./data/postgres` | 20 GB | raise with `PGDATA_SIZE` env |
| `evidence` | `./data/evidence` | unlimited | recommend S3 gateway for prod |

> *Admins can override TTLs in `persistence.yml`.  Changes must pass CI retention lint.*
