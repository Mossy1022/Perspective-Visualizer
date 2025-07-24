import { DrillDown, PerspectiveSnapshot } from "../types/Perspective";

export function rollUp(child: PerspectiveSnapshot, reducer: DrillDown['reducer']): number {
    const vals = child.grid.flatMap(r => r.cells.map(c => c.weight));
    switch (reducer) {
      case 'sum':            return vals.reduce((a, b) => a + b, 0);
      case 'conf_weighted':  return weightedMean(child);
      case 'pareto':         return vals.filter(v => Math.abs(v) > 20).reduce((a, b) => a + b, 0);
    }
  }
  
  function weightedMean(snap: PerspectiveSnapshot){
    const pairs = snap.grid.flatMap(r => r.cells.map(c => [c.weight, c.loc_conf] as const));
    const [num, den] = pairs.reduce(([n,d],[w,c]) => [n+w*c, d+c], [0,0]);
    return den ? num/den : 0;
  }