import { create } from 'zustand';
import { PerspectiveSnapshot } from '../types/Perspective';
import { emit } from '../utils/telemetry';
import { save, loadAll } from '../utils/persistence';
import { makeBlankSnapshot } from '../utils/makeBlankSnapshot';  

/* ——————— Shared helpers ——————— */

export type CellRef = { option_id: string; criterion_id: string };

function loadById(id: string): PerspectiveSnapshot | undefined {
  return loadAll().find(s => s.meta.id === id);
}

function findCell(
  snap: PerspectiveSnapshot,
  option_id: string,
  criterion_id: string,
) {
  return snap
    .grid.find(r => r.option_id === option_id)
    ?.cells.find(c => c.criterion_id === criterion_id);
}

/* ——————— Store types ——————— */

export type SelectedCell = CellRef | null;
export type FocusTrail  = string[]; // ['root', 'child‑1', …]

type FocusMode =
  | null
  | { kind: 'option'; option_id: string }
  | { kind: 'criterion'; criterion_id: string }
  | { kind: 'cell'; option_id: string; criterion_id: string };

interface State {
  /* snapshots & mutation */
  current?: PerspectiveSnapshot;
  setSnapshot:  (p: PerspectiveSnapshot) => void;
  updateWeight: (row: string, criterion: string, delta: number) => void;

  /* grid selection / focus */
  selectedCell: SelectedCell;
  setSelectedCell: (cell: SelectedCell) => void;
  focusMode: FocusMode;
  setFocusMode: (focus: FocusMode) => void;
  exitFocusMode: () => void;

  /* drill‑down navigation */
  focusTrail: FocusTrail;
  openDrilldown: (parent: CellRef) => void;
  backOneLevel: () => void;

  /* grid edits */
  addOption:      (name: string) => void;
  addCriterion:   (name: string) => void;
  deleteOption:   (optionId: string) => void;
  deleteCriterion:(critId: string) => void;

  /* persistence */
  saveSnapshot: () => void;

  createDrilldown: (cell: CellRef) => void;

}

/* ——————— Store implementation ——————— */

export const usePerspectiveStore = create<State>((set, get) => ({

  /* ------------- snapshot loader ------------- */
  setSnapshot: (p) => set({ current: p, focusTrail: [p.meta.id] }),

  /* ------------- weight editing -------------- */
  updateWeight: (rowId, critId, delta) => {
    const snap = structuredClone(get().current);
    if (!snap) return;

    const cell = findCell(snap, rowId, critId);
    if (!cell) return;

    cell.weight = Math.max(-100, Math.min(100, cell.weight + delta));
    cell.updated_at = new Date().toISOString();

    emit('grid_redraw_ms', performance.now());
    set({ current: snap });
  },

  /* ------------- drill‑down nav --------------- */
  focusTrail: [],

  openDrilldown: ({ option_id, criterion_id }) => {
    const parent = get().current;
    if (!parent) return;

    const cell = findCell(parent, option_id, criterion_id);
    if (!cell?.drilldown) return;

    const child = loadById(cell.drilldown.snapshot_id);
    if (!child) return;

    const trail = [...get().focusTrail, child.meta.id];
    if (trail.length > 4) return;           // depth guard (≤ 3 levels)

    set({ current: child, focusTrail: trail, focusMode: null });
  },

  backOneLevel: () => {
    const trail = get().focusTrail;
    if (trail.length <= 1) return;          // already at root

    const parentId = trail[trail.length - 2];
    const parent   = loadById(parentId);
    if (!parent)   return;

    set({ current: parent, focusTrail: trail.slice(0, -1), focusMode: null });
  },

  /** Create a blank drill‑down snapshot and jump into it. */
  createDrilldown: ({ option_id, criterion_id }) => {
    const parent = structuredClone(get().current);
    if (!parent) return;

    const parentCell = findCell(parent, option_id, criterion_id);
    if (!parentCell) return;

    // if one already exists just open it
    if (parentCell.drilldown) {
      get().openDrilldown({ option_id, criterion_id });
      return;
    }

    const child = makeBlankSnapshot(parent);
    save(child);                                   // persist new snapshot

    parentCell.drilldown = {
      snapshot_id: child.meta.id,
      reducer: 'conf_weighted',
      last_rollup: 0,
    };
    parentCell.updated_at = new Date().toISOString();

    save(parent);                                  // persist updated parent
    set({ current: parent });                      // refresh UI
    get().openDrilldown({ option_id, criterion_id });
  },

  /* ------------- option / criterion CRUD ----- */
  addOption: (name) => {
    const snap = structuredClone(get().current);
    if (!snap) return;

    snap.grid.push({
      option_id: name,
      cells: snap.grid[0].cells.map(c => ({
        criterion_id: c.criterion_id,
        weight: 0,
        loc_conf: 1,
        updated_by: 'anon',
        updated_at: new Date().toISOString(),
      })),
    });
    set({ current: snap });
  },

  addCriterion: (name) => {
    const snap = structuredClone(get().current);
    if (!snap) return;

    snap.grid.forEach(row =>
      row.cells.push({
        criterion_id: name,
        weight: 0,
        loc_conf: 1,
        updated_by: 'anon',
        updated_at: new Date().toISOString(),
      }),
    );
    set({ current: snap });
  },

  deleteOption: (optionId) => {
    const snap = structuredClone(get().current);
    if (!snap) return;
    snap.grid = snap.grid.filter(r => r.option_id !== optionId);
    set({ current: snap });
  },

  deleteCriterion: (critId) => {
    const snap = structuredClone(get().current);
    if (!snap) return;
    snap.grid.forEach(r => {
      r.cells = r.cells.filter(c => c.criterion_id !== critId);
    });
    set({ current: snap });
  },

  /* ------------- selection / focus ----------- */
  selectedCell: null,
  setSelectedCell: (cell) => set({ selectedCell: cell }),

  focusMode: null,
  setFocusMode: (focus) => set({ focusMode: focus }),
  exitFocusMode: () => set({ focusMode: null }),

  /* ------------- persistence ----------------- */
  saveSnapshot: () => {
    const snap = get().current;
    if (snap) {
      save(snap);
      console.info('Snapshot saved', snap.meta.id);
    }
  },

}));