import { create } from 'zustand';
import { PerspectiveSnapshot } from '../types/Perspective';
import { emit } from '../utils/telemetry';
import { save } from '../utils/persistence';

/* ────────── 1.  Extend the interface ────────── */
interface State {
  current?: PerspectiveSnapshot;
  setSnapshot:  (p: PerspectiveSnapshot) => void;
  updateWeight: (row: string, criterion: string, delta: number) => void;
  addOption:      (name: string) => void;
  addCriterion:   (name: string) => void;
  deleteOption:   (optionId: string) => void;
  deleteCriterion:(critId: string) => void;
  saveSnapshot:   () => void;
}

export const usePerspectiveStore = create<State>((set, get) => ({
  setSnapshot: (p) => set({ current: p }),
  updateWeight: (rowId, critId, delta) => {
    const snap = structuredClone(get().current);
    if (!snap) return;

    set({ current: snap });
    get().saveSnapshot();   

    // naïve path; proper Explain‑Back gate will override later
    const row = snap.grid.find(r => r.option_id === rowId);
    const cell = row?.cells.find(c => c.criterion_id === critId);
    if (cell) {
      cell.weight = Math.max(-100, Math.min(100, cell.weight + delta));
      cell.updated_at = new Date().toISOString();
      emit('grid_redraw_ms', performance.now());   // crude, refine
      set({ current: snap });
    }
  },

  addOption: (name: string) => {
    const snap = structuredClone(get().current);
    if (!snap) return;

    snap.grid.push({
      option_id: name,
      cells: snap.grid[0].cells.map(c => ({
        criterion_id: c.criterion_id,
        weight: 0, loc_conf: 1,
        updated_by: 'anon', updated_at: new Date().toISOString()
      }))
    });
    set({ current: snap });
  },

  addCriterion: (name: string) => {
    const snap = structuredClone(get().current);
    if (!snap) return;

    // add a cell to every row
    for (const row of snap.grid) {
      row.cells.push({
        criterion_id: name,
        weight: 0, loc_conf: 1,
        updated_by: 'anon', updated_at: new Date().toISOString()
      });
    }
    set({ current: snap });
  },

  deleteOption: (optionId: string) => {
    const snap = structuredClone(get().current);
    if (!snap) return;
    snap.grid = snap.grid.filter(r => r.option_id !== optionId);
    set({ current: snap });
  },

  deleteCriterion: (critId: string) => {
    const snap = structuredClone(get().current);
    if (!snap) return;
    for (const row of snap.grid) {
      row.cells = row.cells.filter(c => c.criterion_id !== critId);
    }
    set({ current: snap });
  },
  saveSnapshot: () => {
    const snap = get().current;
    if (snap) {
      save(snap);                     // from utils/persistence.ts
      console.info('Snapshot saved', snap.meta.id);
    }
  }

}));
