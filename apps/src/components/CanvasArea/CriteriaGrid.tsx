import React from 'react';
import { usePerspectiveStore } from '../../store/usePerspectiveStore';
import CriteriaCell from './CriteriaCell';
import { formatLabel } from '../../utils/formatLabel';

// helper to sum numeric arrays
const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

/**
 * **CriteriaGrid (transposed)**
 *
 *   • **Rows  = criteria**  (could be hundreds → vertical scroll is friendlier)
 *   • **Cols  = options**   (tends to stay in dozens → fits viewport width)
 *
 * Underlying data model stays exactly the same; we simply build two lookup
 * tables so we can grab the correct WeightCell for each criterion / option
 * combo on the fly.
 */
const CriteriaGrid: React.FC = () => {
  const snap = usePerspectiveStore((s) => s.current);

  const addOption = usePerspectiveStore((s) => s.addOption);
  const addCriterion = usePerspectiveStore((s) => s.addCriterion);
  const deleteOption = usePerspectiveStore((s) => s.deleteOption);
  const deleteCriterion = usePerspectiveStore((s) => s.deleteCriterion);
  const focusMode = usePerspectiveStore(s => s.focusMode);
  const setFocusMode = usePerspectiveStore(s => s.setFocusMode);
  const exitFocusMode = usePerspectiveStore(s => s.exitFocusMode);

  if (!snap) return <p>Select a perspective.</p>;

  // ──────────────────────────────────────────────────────────
  // Build quick-access arrays so we avoid O(n²) look-ups in render
  // ──────────────────────────────────────────────────────────
  const optionIds = snap.grid.map((r) => r.option_id);
  const criterionIds = snap.grid[0].cells.map((c) => c.criterion_id);

  let visibleOptionIds = optionIds, visibleCriterionIds = criterionIds;

  if (focusMode) {
    if (focusMode.kind === "option") visibleOptionIds = [focusMode.option_id];
    if (focusMode.kind === "criterion") visibleCriterionIds = [focusMode.criterion_id];
    if (focusMode.kind === "cell") {
      visibleOptionIds = [focusMode.option_id];
      visibleCriterionIds = [focusMode.criterion_id];
    }
  }

  /** Get the cell object for [option, criterion]. */
  const getCell = (optionId: string, critId: string) =>
    snap.grid
      .find((r) => r.option_id === optionId)!
      .cells.find((c) => c.criterion_id === critId)!;

  return (
    <>
    {focusMode && (
      <div aria-live="polite" style={{
        marginBottom: 10, padding: "6px 18px", borderRadius: 7,
        background: "#faf4fd", fontFamily: "var(--font-mono)", fontSize: "1.04em",
        display: "flex", alignItems: "center", gap: 14, border: "1px solid #eee",
      }}>
        <button onClick={exitFocusMode}
          style={{fontWeight: 700, color: "#276acf", background: "none", border: "none", cursor: "pointer"}}>← Back</button>
        <span>
          Focus:&nbsp;
          {focusMode.kind === "option" && <b>{formatLabel(focusMode.option_id)}</b>}
          {focusMode.kind === "criterion" && <b>{formatLabel(focusMode.criterion_id)}</b>}
          {focusMode.kind === "cell" && <>
            <b>{formatLabel(focusMode.option_id)}</b> × <b>{formatLabel(focusMode.criterion_id)}</b>
          </>}
        </span>
        <span style={{marginLeft:"auto", color:"#888", fontSize:"0.92em"}}>(Esc to exit)</span>
      </div>
    )}
 
    <table className="criteria-grid" role="grid">
      {/* ────────── COL HEADERS = options ────────── */}
      <thead>
        <tr>
          <th scope="col">
            Criterion / Option
            <button
              className="btn-ghost"
              onClick={() => {
                const name = prompt('New criterion name?');
                if (name) addCriterion(name);
              }}
              aria-label="Add criterion"
            >
              ＋
            </button>
          </th>

          {visibleOptionIds.map((optId) => (
            <th
              key={optId}
              scope="col"
              onClick={e => e.altKey ? setFocusMode({ kind: "option", option_id: optId }) : undefined}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
            {formatLabel(optId)}
              <button
                className="btn-ghost"
                onClick={() => deleteOption(optId)}
                aria-label={`Delete ${optId}`}
              >
                ✕
              </button>
            </th>
          ))}

          {/* trailing header cell to add option */}
          <th>
            <button
              className="btn-ghost"
              onClick={() => {
                const name = prompt('New option name?');
                if (name) addOption(name);
              }}
              aria-label="Add option"
            >
              ＋
            </button>
          </th>
        </tr>
      </thead>

      {/* ────────── ROWS = criteria ────────── */}
      <tbody>
        {visibleCriterionIds.map((critId) => (
          <tr key={critId}>
            <th
              scope="row"
              onClick={e => e.altKey ? setFocusMode({ kind: "criterion", criterion_id: critId }) : undefined}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              {formatLabel(critId)}
              <button
                className="btn-ghost"
                onClick={() => deleteCriterion(critId)}
                aria-label={`Delete ${critId}`}
              >
                ✕
              </button>
            </th>

            {visibleOptionIds.map((optId) => {
              const cell = getCell(optId, critId);
              return (
                <CriteriaCell
                  key={optId}
                  rowId={optId}      // still pass option as rowId for updateWeight()
                  critId={critId}
                  weight={cell.weight}
                />
              );
            })}

            {/* sum of this criterion across all options */}
            <td>
              <strong>
                {sum(visibleOptionIds.map((optId) => getCell(optId, critId).weight))}
              </strong>
            </td>
          </tr>
        ))}
      </tbody>

      {/* ────────── FOOTER = per-option averages ────────── */}
      <tfoot>
        <tr>
          <th scope="row">Avg / Σ</th>
          {visibleOptionIds.map((optId) => {
            const avg =
              sum(
                visibleCriterionIds.map((critId) => getCell(optId, critId).weight),
              ) / visibleCriterionIds.length;
            return (
              <td key={optId}>
                <strong>{avg.toFixed(1)}</strong>
              </td>
            );
          })}
          <td /> {/* empty bottom-right corner */}
        </tr>
      </tfoot>
    </table>
    </>
  );
};

export default CriteriaGrid;