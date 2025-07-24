<!-- phase:1 --><!-- draft -->
# GDPR & Privacy Compliance Note

| Article                    | Tool response                                                                      |
| -------------------------- | ---------------------------------------------------------------------------------- |
| 15 – Right of access       | `/api/v1/me/export` returns ZIP of snapshots + evidence meta.                      |
| 17 – Right to be forgotten | `DELETE /me` endpoint deletes keys, snapshots, evidence → tombstone in Postgres.   |
| 20 – Data portability      | Uses the same JSON schema defined in *Data Model V1* (open standard, MIT licence). |
| 30 – Records of processing | Logged in `data_processing_register.md` (internal).                                |

Telemetry opt‑out via `.env TELEMETRY_OPTOUT=true`; respects “Do‑Not‑Track” header.
