import React, { useState, useCallback } from 'react';
import ExplorerPane from './ExplorerPane/ExplorerPane';
import CanvasArea   from './CanvasArea/CanvasArea';
import InsightDock  from './InsightDock/InsightDock';
import Footbar      from './Footbar/Footbar';
import Resizer      from './Resizer';            // 🆕

import './AppRoot.css';

const MIN = 180;           // sane limits
const MAX = 500;

const AppRoot: React.FC = () => {
  const [leftW , setLeftW ] = useState(260);
  const [rightW, setRightW] = useState(300);

  /* generic clamp‑&‑set helper */
  const resize = useCallback((setter: React.Dispatch<React.SetStateAction<number>>) =>
    (d: number) => setter(w => Math.min(MAX, Math.max(MIN, w + d))), []);

  function usePaneWidths() {
    const [left,  setLeft ] = useState(() => Number(localStorage.leftWidth)  || 260);
    const [right, setRight] = useState(() => Number(localStorage.rightWidth) || 300);
  
    const set = (key: 'left' | 'right', fn: (n: number) => number) =>
      key === 'left'
        ? setLeft(n => (localStorage.leftWidth  = fn(n), fn(n)))
        : setRight(n => (localStorage.rightWidth = fn(n), fn(n)));
  
    return { left, right, setLeft: (d: number) => set('left', n => n + d),
                         setRight:(d: number) => set('right',n => n + d) };
  }
  

  return (
    <div
      className="studio-root"
      style={
        { '--left-rail':  `${leftW}px`,
          '--right-dock': `${rightW}px` } as React.CSSProperties
      }
    >
      <aside className="left-rail shadow-right"><ExplorerPane /></aside>
      <Resizer side="left"  onResize={resize(setLeftW)} />

      <main  className="canvas-wrap"><CanvasArea /></main>
      <Resizer side="right" onResize={resize(setRightW)} />

      <aside className="right-dock shadow-left"><InsightDock /></aside>

      {/* lives outside grid flow but inside root */}
      <footer className="footbar"><Footbar /></footer>
    </div>
  );
};

export default AppRoot;
