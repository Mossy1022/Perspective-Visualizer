<!-- phase:1 -->

Base URL: `/api/v1`

| Method | Path | Auth | Purpose |
| ------ | ---- | ---- | ------- |
| `GET`  | `/perspectives/{id}` | public | Fetch one snapshot (JSON = Data Model V1). |
| `POST` | `/perspectives` | Bearer JWT | Create new snapshot. Body = full model. |
| `PATCH`| `/perspectives/{id}` | Bearer JWT | Submit RFC‑6902 JSON‑Patch diff. |

### Headers
Authorization: Bearer **{JWT}**  
Content‑Type: application/json
### Throttling
* 50 req/min/user (`429 Too Many Requests` on breach).  
* Exceeding weight‑edit quota also emits `rate_limit_violation_total ++`.

### Example `POST /perspectives`
```bash
curl -X POST https://…/api/v1/perspectives \
 -H "Authorization: Bearer $TOKEN" \
 -d @snapshot.json
 ```

Returns `201 Created` + `Location: /perspectives/snap_01`.
