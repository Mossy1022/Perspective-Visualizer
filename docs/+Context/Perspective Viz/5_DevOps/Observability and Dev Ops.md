## ✅ Logging

- Format: **JSON Lines**
    
- Fields: `ts`, `span_id`, `user_hash`, `event`, `payload`
    
- Output: `stdout` (captured via `docker-compose` stack with Loki & Grafana dashboard)
    

---

## 📈 Metrics (Prometheus)

|Name|Type|Labels|Description|
|---|---|---|---|
|`intent_parser_hit`|counter|`result`|parse success/failure|
|`explain_back_missing_total`|counter|—|missing Explain‑Back payload on commit|
|`sim_run_time_ms_bucket`|histogram|—|Monte‑Carlo sim latency|
|`rate_limit_violation_total`|counter|`user_hash`|throttling incidents|
|`chip_expand_latency_ms`|histogram|—|expand animation latency (Tier‑0)|
|`heatmap_scroll_fps`|gauge|—|heat‑map canvas FPS (P95)|
|`arrow_draw_fps`|gauge|—|FPS for arrow overlay rendering|
|`decision_latency_seconds_bucket`|histogram|`snapshot_id`|server-side measure of total session latency|
|`empathy_score_ratio`|gauge|`canvas_id`, `session_id`|Explain-Back agreement rate|
|`drilldown_rollup_ms`|histogram|—|time to recompute & cache `last_rollup` in nested snapshot|
|`drilldown_open_ms`|histogram|—|time from UI action to nested grid mount|

---

## 📊 Performance Budget KPIs

| KPI                                  | Metric name                  | Target          |
| ------------------------------------ | ---------------------------- | --------------- |
| **First Contentful Paint**           | `first_contentful_paint_ms`  | ≤ 1 500 ms      |
| **Grid redraw latency (≥ 30 rows)**  | `grid_redraw_ms`             | ≤ 50 ms         |
| **Edge-hover highlight latency**     | `edge_hover_latency_ms`      | ≤ 16 ms         |
| **Tier‑0 chip expand latency**       | `chip_expand_latency_ms`     | ≤ 100 ms        |
| **Heat-map scroll frame-rate (P95)** | `heatmap_scroll_fps`         | ≥ 60 FPS        |
| **Arrow-draw frame-rate (P95)**      | `arrow_draw_fps`             | ≥ 30 FPS        |
| **Drill-down open latency**          | `drilldown_open_ms`          | ≤ 120 ms        |
| **Rate-limit violations**            | `rate_limit_violation_total` | SLO = 0 warning |

---

## 🧪 PostHog Events (Client-side, batched every 5 s)

### `decision_session_start`

- props: `canvas_id`, `snapshot_id`, `user_id`
    

### `decision_session_end`

- props: `canvas_id`, `snapshot_id`, `user_id`, `latency_ms`
    

### `empathy_check_result`

- props: `canvas_id`, `session_id`, `user_id`, `opponent_id`, `correct` (bool)
    

---

## 📉 Derived Metrics

### **Decision latency**

Derived from PostHog + backend join:

```text
decision_latency_seconds = decision_session_end.ts − decision_session_start.ts
```

Prometheus histogram:

- Metric: `decision_latency_seconds_bucket`
    
- Buckets: `0.5 | 1 | 2 | 4 | 8 | 16 | 32 hours`
    
- Grafana panel: **P95 ≤ 10 h** alert threshold (aligned with Roadmap case study)
    

---

### **Empathy Score Ratio**

Calculated when Explain‑Back modal closes:

```text
empathy_score_ratio =
  sum(correct) by (canvas_id, session_id)
  / count() by (canvas_id, session_id)
```

- Metric: `empathy_score_ratio` (gauge)
    
- Exported every minute with labels: `canvas_id`, `session_id`
    
- Aggregation: `avg_over_time(empathy_score_ratio[5m])`
    
- SLO Target: **≥ 70 %** per session (see MVP Requirements table)
    

---

## ✅ CI Matrix (`ci_matrix.yml`)

|Category|Variants|
|---|---|
|Browsers|chrome-stable, firefox-latest, edge-latest, safari-tp|
|OS|ubuntu-latest, macos-latest, windows-latest|
|Accessibility|Axe, VoiceOver (macOS), NVDA (Windows)|
|SBOM + Signing|Anchore + `cosign sign-verify`|

---

Let me know if you'd like this formatted as a markdown export, compiled into Grafana panel annotations, or aligned with a `monitoring/` source folder.
### Outcome KPI mapping
| KPI (Vision → Roadmap) | Metric / Event                    | Derivation query                                                      | Target |
| ---------------------- | --------------------------------- | --------------------------------------------------------------------- | ------ |
| Decision latency       | `decision_latency_seconds_bucket` | `histogram_quantile(0.95, rate(decision_latency_seconds_bucket[1h]))` | ≤ 10 h |
| Empathy score          | `empathy_score_ratio`             | `avg_over_time(empathy_score_ratio[5m])`                              | ≥ 0.70 |
