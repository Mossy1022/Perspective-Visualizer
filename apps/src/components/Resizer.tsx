import React, { useEffect, useRef } from 'react';

type Side = 'left' | 'right';

interface Props {
  side: Side;                           // which splitter?
  onResize: (deltaPx: number) => void;  // callback supplied by parent
}

/**
 * Very small drag handle – does not keep any state itself.
 * Parent owns the width numbers; Resizer just reports movement.
 */
const Resizer: React.FC<Props> = ({ side, onResize }) => {
  const dragging = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      onResize(side === 'left' ? e.movementX : -e.movementX);
    };
    const stop = () => (dragging.current = false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', stop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', stop);
    };
  }, [onResize, side]);

  return (
    <div
      className="resizer"
      aria-label={`${side} pane resizer`}
      onMouseDown={() => (dragging.current = true)}
    />
  );
};

export default Resizer;
