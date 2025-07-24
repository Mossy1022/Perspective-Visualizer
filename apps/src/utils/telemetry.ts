type Metric = 'grid_redraw_ms' | 'rate_limit_violation_total' | 'sim_run_time_ms_bucket';

export function emit(metric: Metric, value: number | object) {
  window.dispatchEvent(
    new CustomEvent('telemetry', { detail: { ts: Date.now(), metric, value } })
  );
}
