import React, { useCallback } from 'react';
import { usePerspectiveStore } from '../../store/usePerspectiveStore';
import chroma from 'chroma-js';

interface Props {
  rowId: string;
  critId: string;
  weight: number;
}

const clamp = (n: number) => Math.max(-100, Math.min(100, n));

const CriteriaCell: React.FC<Props> = ({ rowId, critId, weight }) => {
  const update = usePerspectiveStore(s => s.updateWeight);
  const snap = usePerspectiveStore(s => s.current);
  const createDrilldown = usePerspectiveStore(s => s.createDrilldown);
  const openDrilldown   = usePerspectiveStore(s => s.openDrilldown);
  const setSelectedCell = usePerspectiveStore(s => s.setSelectedCell);

  const selected = usePerspectiveStore(s =>
    s.selectedCell &&
    s.selectedCell.option_id === rowId &&
    s.selectedCell.criterion_id === critId
  );

  const row = snap?.grid.find(r => r.option_id === rowId);
  const cell = row?.cells.find(c => c.criterion_id === critId);
  const conf = cell?.loc_conf ?? 1;
  const hasDrill = !!cell?.drilldown;

  // Drilldown button handler
  const handleDrilldownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasDrill) {
      openDrilldown({ option_id: rowId, criterion_id: critId });
    } else {
      createDrilldown({ option_id: rowId, criterion_id: critId });
    }
  };

  // Normal cell click
  const onCellClick = useCallback((e: React.MouseEvent) => {
    setSelectedCell({ option_id: rowId, criterion_id: critId });
  }, [rowId, critId, setSelectedCell]);

  // Color logic (unchanged)
  const colourScale = chroma
    .scale(['#c9372b', '#f9f9f9', '#1a9850'])
    .domain([-100, 0, 100])
    .mode('lab');
  const baseCol = colourScale(weight).hex();
  const fgCol = chroma(baseCol).alpha(Math.max(conf, 0.3)).css();
  const showPattern = conf < 0.72;
  const isLight = getComputedStyle(document.documentElement).getPropertyValue('--canvas-bg').trim() === '#ffffff';
  const neutralWeight = Math.abs(weight) < 35;

  const onWheel = useCallback<React.WheelEventHandler>(e => {
    e.preventDefault();
    update(rowId, critId, e.deltaY < 0 ? 1 : -1);
  }, [rowId, critId, update]);

  const onKeyDown = useCallback<React.KeyboardEventHandler>(e => {
    let delta = 0;
    if (e.key === 'ArrowUp') delta = e.shiftKey ? 10 : 1;
    if (e.key === 'ArrowDown') delta = e.shiftKey ? -10 : -1;
    if (delta) {
      e.preventDefault();
      update(rowId, critId, delta);
    }
  }, [rowId, critId, update]);

  return (
    <td
      tabIndex={0}
      style={{
        background: fgCol,
        border: showPattern ? '1.5px dashed #fcb900' : undefined,
        position: 'relative',
        color: isLight && neutralWeight ? '#24292f' : undefined,
        overflow: 'hidden',
      }}
      className={
        `criteria-cell${selected ? ' selected' : ''}${hasDrill ? ' has-drilldown' : ''}`
      }
      role="spinbutton"
      aria-label={`${rowId} – ${critId} weight, confidence ${Math.round(conf * 100)}%`}
      aria-valuenow={weight}
      aria-valuemin={-100}
      aria-valuemax={100}
      onWheel={onWheel}
      onKeyDown={onKeyDown}
      onClick={onCellClick}
      title={`Weight: ${weight} / Confidence: ${(conf * 100).toFixed(0)}%`}
    >
      {showPattern && (
        <span
          aria-hidden="true"
          style={{
            pointerEvents: 'none',
            position: 'absolute',
            zIndex: 0,
            inset: 0,
            opacity: 0.4,
            background: "repeating-linear-gradient(135deg, #e9e9ee 0px, #e9e9ee 10px, #fff 10px, #fff 20px)"
          }}
        />
      )}
      <span style={{
        position: 'relative',
        zIndex: 1,
        fontWeight: 500,
        color: !showPattern && neutralWeight && isLight ? '#273040' : undefined
      }}>
        {clamp(weight)}
      </span>
      {showPattern && (
        <span style={{
          position:'absolute',
          right:2, top:2,
          background:'#fff8',
          borderRadius:4,
          fontSize:'0.6em',
          color:'#c28d00',
          fontWeight:600,
          padding:'1px 3px',
          zIndex:2
        }}>?</span>
      )}

      {/* DRILLDOWN BUTTON */}
      {(cell && (hasDrill || !cell.drilldown)) && (
        <button
          className={`drilldown-icon-btn btn-ghost`}
          aria-label={hasDrill ? 'Open Drilldown' : 'Create Drilldown'}
          title={hasDrill
            ? 'Open nested subgrid (drilldown)'
            : 'Create a nested subgrid (drilldown)'}
          style={{
            position: "absolute",
            bottom: 3,
            right: 4,
            zIndex: 10,
            padding: "2px 5px",
            background: hasDrill ? "#17c36822" : "#bbb3",
            border: hasDrill ? "1.5px solid #1a9850" : "1px solid #aaa5",
            borderRadius: "6px",
            fontSize: "1em",
            color: hasDrill ? "#188647" : "#274359",
            cursor: "pointer",
            transition: "background 0.2s, color 0.15s",
            minWidth: "22px"
          }}
          tabIndex={0}
          onClick={handleDrilldownClick}
        >
          ▦
        </button>
      )}

    </td>
  );
};

export default CriteriaCell;