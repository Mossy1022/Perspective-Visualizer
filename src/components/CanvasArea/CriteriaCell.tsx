import React, { useCallback } from 'react';
import { usePerspectiveStore } from '../../store/usePerspectiveStore';

interface Props {
  rowId: string;
  critId: string;
  weight: number;
}

const clamp = (n: number) => Math.max(-100, Math.min(100, n));

const toColour = (w: number) => {
    // scale −100..0..100 to 0..120..240 hue (red→white→green)
    const hue = 120 + (w / 100) * -120;   // 120 green, −120 red
    return `hsl(${hue}, 80%, 90%)`;
  };

const CriteriaCell: React.FC<Props> = ({ rowId, critId, weight }) => {
  const update = usePerspectiveStore(s => s.updateWeight);

  /* mouse-wheel ±1 */
  const onWheel = useCallback<React.WheelEventHandler>(e => {
    e.preventDefault();
    update(rowId, critId, e.deltaY < 0 ? 1 : -1);
  }, [rowId, critId, update]);

  /* ↑/↓ keys (Shift = ±10) */
  const onKeyDown = useCallback<React.KeyboardEventHandler>(e => {
    let delta = 0;
    if (e.key === 'ArrowUp')   delta = e.shiftKey ? 10  : 1;
    if (e.key === 'ArrowDown') delta = e.shiftKey ? -10 : -1;
    if (delta) {
      e.preventDefault();
      update(rowId, critId, delta);
    }
  }, [rowId, critId, update]);

  return (
    <td
      tabIndex={0}
      style={{ background: toColour(weight) }}
      className="criteria-cell"
      role="spinbutton"
      aria-label={`${rowId} – ${critId} weight`}
      aria-valuenow={weight}
      aria-valuemin={-100}
      aria-valuemax={100}
      onWheel={onWheel}
      onKeyDown={onKeyDown}
    >
      {clamp(weight)}
    </td>
  );
};

export default CriteriaCell;
