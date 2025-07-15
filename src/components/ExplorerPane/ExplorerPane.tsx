import React from 'react';
import { loadAll } from '../../utils/persistence';
import { usePerspectiveStore } from '../../store/usePerspectiveStore';

const ExplorerPane: React.FC = () => {
  const setSnapshot = usePerspectiveStore(s => s.setSnapshot);
  const snapshots   = loadAll();             // one read per render is fine

  return (
    <nav aria-label="Saved snapshots" className="explorer-pane">
      <h3 style={{padding:'8px 12px 4px'}}>Snapshots</h3>
      {snapshots.length === 0 && <p style={{opacity:.5,padding:12}}>None yet.</p>}
      <ul>
        {snapshots.map(s => (
          <li key={s.meta.id}>
            <button
              onClick={() => setSnapshot(s)}
              style={{display:'block',width:'100%',textAlign:'left',padding:8}}
            >
              {s.meta.id}&nbsp;
              <small>({new Date(s.meta.created_at).toLocaleString()})</small>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ExplorerPane;
