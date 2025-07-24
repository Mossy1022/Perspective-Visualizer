import React, { useState } from 'react';
import { usePerspectiveStore } from '../../../store/usePerspectiveStore';

const EvidenceTab: React.FC = () => {
  const selectedCell = usePerspectiveStore(s => s.selectedCell);
  const snapshot = usePerspectiveStore(s => s.current);
  const setSnapshot = usePerspectiveStore(s => s.setSnapshot);

  if (!selectedCell || !snapshot) return <div style={{padding:8}}>No cell selected.</div>;
  const row = snapshot.grid.find(r => r.option_id === selectedCell.option_id);
  const cell = row?.cells.find(c => c.criterion_id === selectedCell.criterion_id);
  if (!cell) return <div style={{padding:8}}>Cell not found.</div>;

  // Multi-evidence support
  const evidence_ids = cell.evidence_ids ?? (cell.evidence_id ? [cell.evidence_id] : []);
  const attached = evidence_ids.map(id => snapshot.evidence.find(e => e.id === id)).filter(Boolean);

  // New evidence (pending state)
  const [addURL, setAddURL] = useState('');
  const [pending, setPending] = useState(false);

  // Handler: Attach evidence
  function attachEvidence() {
    if (!addURL.trim()) return;
    setPending(true);
    setTimeout(() => {
      const cred_score = 0.4 + Math.random() * 0.5; // For demo, random
      const newId = `e_${Date.now().toString(36)}`;
      const newEvidence = {
        id: newId,
        title: addURL,
        source_url: addURL,
        cred_score,
        mime: 'text/html',
        added_by: 'demo',
        added_at: new Date().toISOString(),
      };
      const next : any = structuredClone(snapshot);
      next.evidence.push(newEvidence);
      const trow = next.grid.find(r => r.option_id === selectedCell.option_id);
      const tcell = trow?.cells.find(c => c.criterion_id === selectedCell.criterion_id);
      if (tcell) {
        tcell.evidence_ids = [...(tcell.evidence_ids ?? []), newId];
        tcell.updated_at = new Date().toISOString();
      }
      setSnapshot(next);
      setAddURL('');
      setPending(false);
    }, 650); // simulate async/fetch
  }

  // Handler: Delete
  function deleteEvidence(idx: number) {
    const next : any = structuredClone(snapshot);
    const trow = next.grid.find(r => r.option_id === selectedCell.option_id);
    const tcell = trow?.cells.find(c => c.criterion_id === selectedCell.criterion_id);
    if (tcell) {
      if (!tcell.evidence_ids) return;
      tcell.evidence_ids.splice(idx, 1);
      tcell.updated_at = new Date().toISOString();
    }
    setSnapshot(next);
  }

  // Handler: Drag/drop reorder
  function moveEvidence(from: number, to: number) {
    if (from === to) return;
    const next : any = structuredClone(snapshot);
    const trow = next.grid.find(r => r.option_id === selectedCell.option_id);
    const tcell = trow?.cells.find(c => c.criterion_id === selectedCell.criterion_id);
    if (tcell) {
      if (!tcell.evidence_ids) return;
      const ev = tcell.evidence_ids.splice(from, 1)[0];
      tcell.evidence_ids.splice(to, 0, ev);
      tcell.updated_at = new Date().toISOString();
    }
    setSnapshot(next);
  }

  return (
    <div style={{padding:'8px 2px'}}>
      <div style={{fontWeight:600,marginBottom:10,fontSize:'1.06em'}}>Evidence List</div>
      <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:14}}>
        <input
          value={addURL}
          onChange={e => setAddURL(e.target.value)}
          placeholder="Paste link or source"
          style={{
            flex:1,
            border:'1px solid #bbb',
            borderRadius:5,
            padding:'4px 9px',
            fontSize:'1em'
          }}
        />
        <button
          onClick={attachEvidence}
          disabled={!addURL.trim() || pending}
          style={{
            background:'#60a5fa',
            color:'#fff',border:0, borderRadius:4,
            padding:'6px 14px',
            fontWeight:600, fontSize:'1em',
            cursor:pending?'progress':'pointer'
          }}
        >
          {pending?'Adding…':'＋Attach'}
        </button>
      </div>
      <ul style={{padding:0,margin:0}}>
        {attached.length === 0 && (
          <li style={{color:'#999',fontStyle:'italic',margin:'10px 0'}}>No evidence yet. (Attach a URL or document.)</li>
        )}
        {attached.map((e, idx) => (
          <li
            key={e.id}
            draggable
            onDragStart={ev => ev.dataTransfer.setData('text/plain', String(idx))}
            onDrop={ev => {
              ev.preventDefault();
              const from = +ev.dataTransfer.getData('text/plain');
              moveEvidence(from, idx);
            }}
            onDragOver={ev => ev.preventDefault()}
            style={{
              background:'#f6f8fc',
              border:'1px solid #dde',
              margin:'8px 0',padding:'7px 11px',
              borderRadius:7,
              boxShadow:'0 1px 2px 0 #eee',
              display:'flex',alignItems:'center',gap:10
            }}
          >
            <span style={{
              flex:'1 1 0%',
              fontWeight:500,
              fontFamily:'monospace,ui-mono',
              color:'#286'}}>{e.title || e.source_url}</span>
            <span
              title="Credibility meter"
              style={{
                display:'inline-block',
                width:44,
                height:8,
                borderRadius:4,
                background:'#eef',
                marginRight:7,
                backgroundImage:`linear-gradient(90deg,#31bc57 0%,#e0b700 ${e.cred_score*100}%,#db4a4a ${e.cred_score*100}%)`
              }}
            />
            <span style={{fontFamily:'monospace',fontWeight:600}}>
              {e.cred_score > .75 ? "★"
                 : e.cred_score > .4 ? "△"
                 : "✖"}
            </span>
            <button
              onClick={() => deleteEvidence(idx)}
              aria-label="Remove"
              style={{
                border:'none',background:'none',color:'#f44',fontWeight:800,
                fontSize:'1.2em',marginLeft:3
              }}
              tabIndex={0}
            >✕</button>
          </li>
        ))}
      </ul>
      <div style={{color:'#aaa',fontSize:'93%',margin:'8px 0 0'}}>
        {attached.length === 0 ?
          <span>⚠️ This cell is unsourced. Attach at least one credible source before finalizing.</span>
          : null
        }
      </div>
    </div>
  );
};

export default EvidenceTab;