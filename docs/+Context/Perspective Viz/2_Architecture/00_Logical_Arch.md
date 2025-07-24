<!-- phase:1 --><!-- draft -->
# Logical Architecture
```mermaid
flowchart TD
    %% ── Clients ───────────────────────────────────────────────────────
    A["Browser / Electron Shell"] -->|HTTPS + WebSockets| B(API_Gateway)

    %% ── Edge / Auth ───────────────────────────────────────────────────
    B --> C[Auth_and_Rate_Limiter]

    %% ── Core services ─────────────────────────────────────────────────
    C --> D(Perspective_Service)
    C --> E(Evidence_Blob_Store)
    C --> F(Analytics_Ingest)

    %% ── Local-first cache ─────────────────────────────────────────────
    D <--> G["Local-first Vault<br>IndexedDB"]

    %% ── Self-host bundle ──────────────────────────────────────────────
    subgraph Self_Host_Container
        direction TB
        D
        E
        F
    end
```

| Layer         | Tech choice                                                                                | Notes                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| Front‑end     | React 18 + Vite + PNPM                                                                     | Light DOM; Canvas via SVG for a11y; WASM for Monte‑Carlo.                               |
| Gateway       | Fastify + tRPC                                                                             | Single HTTP/2 entry point; JSON RPC stream.                                             |
| Storage       | Perspective snapshots in **Postgres‑JSONB**  <br>Evidence blobs in **S3‑compatible minio** | Local‑first vault syncs on reconnect using CRDT merge‑wins rules (see _Sync Protocol_). |
| AuthN         | JWT (HS256)                                                                                | Optional OIDC proxy for enterprise installs.                                            |
| Observability | OpenTelemetry JSON → Loki/Grafana                                                          | Metric names in _Event Taxonomy_.                                                       |
