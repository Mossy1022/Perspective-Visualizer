<!-- phase:1 --><!-- draft -->
# Scaling & Capacity

| Tier | Users | Suggested infra |
|------|-------|-----------------|
| Dev / demo | < 20 | 1× t3.medium, 10 GB SSD |
| Small org | < 500 | 2× t3.large + RDS Postgres micro |
| Public beta | < 15 k | k8s (3 pods per svc) + RDS aurora + S3 |

CPU spikes: Monte‑Carlo WASM can burst to 100 % – colocate a small **Rust gRPC worker pool** if > 5 sim/s sustained.
