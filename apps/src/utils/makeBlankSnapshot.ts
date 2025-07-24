import { PerspectiveSnapshot } from '../types/Perspective';

/**
 * Create an empty child snapshot that inherits agent & license from `parent`.
 * The grid keeps the same row / column layout but zeroes every weight so the
 * user starts from a clean slate.
 */
export function makeBlankSnapshot(parent: PerspectiveSnapshot): PerspectiveSnapshot {
  const now = new Date().toISOString();
  return {
    meta: {
      id: `snap_${Date.now().toString(36)}`,
      created_at: now,
      parent_snapshot_id: parent.meta.id,
      license_code: parent.meta.license_code,
    },
    agent: parent.agent,                    // keep author identity
    grid: parent.grid.map(r => ({
      option_id: r.option_id,
      cells: r.cells.map(c => ({
        criterion_id: c.criterion_id,
        weight: 0,
        loc_conf: 1,
        updated_by: parent.agent.id,
        updated_at: now,
      })),
    })),
    edges: [],
    evidence: [],
    confidence: 0.5,
    emotion: { valence: 0, arousal: 0 },
    badges: { reputation: 0, license: parent.meta.license_code },
    simulation: null,
  };
}