import type { PerspectiveSnapshot } from '../types/Perspective';

const KEY = 'pv_snapshots_v1';

export function loadAll(): PerspectiveSnapshot[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]'); }
  catch { return []; }
}

export function save(snap: PerspectiveSnapshot) {
  const all = loadAll().filter(s => s.meta.id !== snap.meta.id);
  localStorage.setItem(KEY, JSON.stringify([...all, snap]));
}