import React from 'react';
import { usePerspectiveStore } from '../../store/usePerspectiveStore';

const Footbar: React.FC = () => {
  const saveSnapshot = usePerspectiveStore(s => s.saveSnapshot);

  return (
    <div role="contentinfo">
      <button onClick={saveSnapshot}>
        💾 Save snapshot
      </button>
    </div>
  );
};

export default Footbar;
