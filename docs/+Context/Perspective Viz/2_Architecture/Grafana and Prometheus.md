### Why Prometheus + Grafana matter for _this_ React app

|Layer|What we just added|Why the React codebase needs it|
|---|---|---|
|**Metrics emitter**|`scripts/train_intent_parser.js` writes **Prometheus-formatted counters & gauges** to `metrics.prom`. Your React UI already dispatches custom-event telemetry (`emit()` in `utils/telemetry.ts`).|Gives every slice of the stack—Node CLI, WASM simulations, and browser interactions—a common, language-agnostic place to drop numbers.|
|**Metrics server**|`scripts/metrics_server.js` exposes `http://localhost:9464/metrics`.|Local Prometheus can now **scrape a single endpoint** instead of poking around internal state or logs.|
|**Prometheus**|Docker service reads `ops/prometheus/file_sd/targets.json` → `host.docker.internal:9464`.|Pull-based collection means _you_ never have to push or open ports from the React dev server. It just works wherever the Node helper runs.|
|**Grafana + dashboard seed**|Gauge (F-score) + time-series (hit ratio) autoload via provisioning.|Turns raw numbers into **visible guard-rails**: you’ll notice immediately if the parser regresses during a refactor or if UI performance KPIs drift.|

#### In practice

1. **Run**
    
    ```bash
    npm run generate && npm run train   # → rewrites metrics.prom
    docker compose up -d                # → Prom & Grafana scrape + render
    ```
    
2. **Open Grafana** → [http://localhost:3001](http://localhost:3001/) → `admin / admin`.  
    You’ll see the _Intent Parser KPI_ dashboard update within ~10 s.
    
3. **Develop UI**:
    
    - When the React app fires `emit('grid_redraw_ms', dt)`, you can pipe those events into the same `metrics_server` (simple `window.navigator.sendBeacon('/ingest', …)` hook).
        
    - New metrics show up automatically because Prometheus scrapes _text_; you don’t have to re-compile Prometheus or Grafana—just add another line to `metrics.prom`.
        

#### Why do this **now**, even though the product is young?

- **KPI guard-rails** — The MVP spec (see _Requirements MVP.md_) says the Intent Parser must stay ≥ 0.80 F-score and grid redraw ≤ 50 ms. Dashboards make those promises testable.
    
- **Dev-inner-loop feedback** — Instead of console-logging frame rates or timing calls, you get a live chart that will scream when a change tanks performance.
    
- **CI ready** — The GitHub Action already uploads `metrics.prom`; soon we’ll add a Prometheus unit (via `promtool`) in CI to fail the build if it can’t parse or if an alert rule would fire.
    
- **Future Phase hooks** — Later features (Monte-Carlo WASM, Explain-Back guard-rail) will emit histogram buckets and counters defined in _Observability and Dev Ops.md_. We’re laying the plumbing once so every new module integrates the same way.
    

---

### Next incremental steps (when you’re ready)

1. **Browser → Node bridge**  
    _Create a tiny Express (or reuse `metrics_server.js`) POST `/telemetry` that converts the UI events to Prometheus lines and appends to `metrics.prom`._
    
2. **Alerting rules**  
    Add a `rule_files:` block to `ops/prometheus/prometheus.yml`, e.g.
    
    ```yaml
    - alert: F1_Below_KPI
      expr: intent_parser_f1 < 0.80
      for: 5m
      labels: { severity: "critical" }
    ```
    
3. **Promtool in CI**  
    Extend the workflow to run `promtool check config ops/prometheus/prometheus.yml` so a bad YAML edit fails fast.
    
4. **Performance budgets in UI**  
    Capture `first_contentful_paint_ms` and `chip_expand_latency_ms` (metrics already listed in _Observability and Dev Ops.md_) and watch them in the same dashboard.
    

That’s it—you now have an **observable React + Node pipeline** where every new feature must prove it hasn’t broken accuracy, speed, or guard-rails before it ships.