import React from 'react';
import { usePerspectiveStore } from '../../store/usePerspectiveStore';
import CriteriaCell from './CriteriaCell';

  
  const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);


/* MVP: renders option rows & criterion cols as plain table */
const CriteriaGrid: React.FC = () => {
  const snap = usePerspectiveStore(s => s.current);

  const addOption       = usePerspectiveStore(s => s.addOption);
  const addCriterion    = usePerspectiveStore(s => s.addCriterion);
  const deleteOption    = usePerspectiveStore(s => s.deleteOption);
  const deleteCriterion = usePerspectiveStore(s => s.deleteCriterion);

  if (!snap) return <p>Select a perspective.</p>;

//   Headless table helpers if you want an abstraction – TanStack Table v8
// can supply column/row models without owning the DOM, so you still render
// semantic <table> elements but get sorting/pinning for free.
//   const table = useReactTable({ data, columns, getCoreRowModel: ... });


  return (
    <table className="criteria-grid" role="grid">
      <thead>
        <tr>
            <th scope="col">
            Option / Criterion
            <button onClick={() => {
                const name = prompt('New option name?');
                if (name) addOption(name);
            }} aria-label="Add option">＋</button>
            </th>

            {snap.grid[0].cells.map(c => (
            <th key={c.criterion_id}>
                {c.criterion_id}
                <button
                onClick={() => deleteCriterion(c.criterion_id)}
                aria-label={`Delete ${c.criterion_id}`}
                >✕</button>
            </th>
            ))}

            {/* trailing header cell to add criterion */}
            <th>
            <button onClick={() => {
                const name = prompt('New criterion name?');
                if (name) addCriterion(name);
            }} aria-label="Add criterion">＋</button>
            </th>
        </tr>
        </thead>

      <tbody>
        {snap.grid.map(row => (
          <tr key={row.option_id}>
            <th scope="row">
            {row.option_id}
            <button
                onClick={() => deleteOption(row.option_id)}
                aria-label={`Delete ${row.option_id}`}
            >✕</button>
            </th>
            {row.cells.map(cell => (
              <CriteriaCell
               key={cell.criterion_id}
               rowId={row.option_id}
               critId={cell.criterion_id}
               weight={cell.weight}
              />
            ))}
            <td><strong>{sum(row.cells.map(c => c.weight))}</strong></td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
            <th scope="row">Avg / Σ</th>
            {snap.grid[0].cells.map((c, i) => {
            const avg = sum(snap.grid.map(r => r.cells[i].weight)) / snap.grid.length;
            return <td key={c.criterion_id}><strong>{avg.toFixed(1)}</strong></td>;
            })}
            <td />{/* empty bottom‑right corner */}
        </tr>
        </tfoot>
    </table>
  );
};

export default CriteriaGrid;
function useReactTable(arg0: any) {
    throw new Error('Function not implemented.');
}

