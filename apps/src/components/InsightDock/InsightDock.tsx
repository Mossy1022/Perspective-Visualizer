import React, { useState, useEffect } from 'react';
import { usePerspectiveStore } from '../../store/usePerspectiveStore';
import { formatLabel } from '../../utils/formatLabel';
import EvidenceTab from './tabs/EvidenceTab';
import DefinitionTab from './tabs/DefinitionTab';

import './InsightDock.css';

const FLASH_DURATION = 300;
const clamp = (n: number, min = -100, max = 100) => Math.max(min, Math.min(max, n));

const InsightDock: React.FC = () => {
  const selectedCell = usePerspectiveStore(s => s.selectedCell);
  const snapshot = usePerspectiveStore(s => s.current);
  const setSnapshot = usePerspectiveStore(s => s.setSnapshot);

  let cell, evidenceCards: any[] = [];
  if (selectedCell && snapshot) {
    const row = snapshot.grid.find(r => r.option_id === selectedCell.option_id);
    cell = row?.cells.find(c => c.criterion_id === selectedCell.criterion_id);
    if (cell && cell.evidence_id) {
      evidenceCards = snapshot.evidence.filter(e => e.id === cell.evidence_id);
    }
  }

  const [weight, setWeight] = useState(() => cell?.weight ?? 0);
  const [locConf, setLocConf] = useState(() => cell?.loc_conf ?? 0.5);
  const [rationale, setRationale] = useState(cell?.rationale || '');
  const [flash, setFlash] = useState(false);
  const [tab, setTab] = useState<'inspector'|'evidence'|'definition'|'contradiction'>('inspector');

  useEffect(() => {
    setWeight(cell?.weight ?? 0);
    setLocConf(cell?.loc_conf ?? 0.5);
    setRationale(cell?.rationale || '');
  }, [cell?.weight, cell?.loc_conf, cell?.rationale]);

  useEffect(() => {
    if (!cell || !snapshot) return;
    if (cell.weight === weight && cell.loc_conf === locConf) return;
    const nextSnap = structuredClone(snapshot);
    const targetRow = nextSnap.grid.find(r => r.option_id === selectedCell?.option_id);
    const targetCell = targetRow?.cells.find(c => c.criterion_id === selectedCell?.criterion_id);
    if (targetCell) {
      targetCell.weight = weight;
      targetCell.loc_conf = locConf;
      targetCell.updated_at = new Date().toISOString();
      setSnapshot(nextSnap);
      setFlash(true);
      setTimeout(() => setFlash(false), FLASH_DURATION);
    }
    // eslint-disable-next-line
  }, [weight, locConf]);

  const handleRationaleBlur = () => {
    if (!rationale.trim()) {
      alert('Explain-back required!');
      setRationale(cell?.rationale || '');
      return;
    }
    if (selectedCell && snapshot) {
      const nextSnap = structuredClone(snapshot);
      const targetRow = nextSnap.grid.find(r => r.option_id === selectedCell.option_id);
      const targetCell = targetRow?.cells.find(c => c.criterion_id === selectedCell.criterion_id);
      if (targetCell) {
        targetCell.rationale = rationale;
        targetCell.updated_at = new Date().toISOString();
        setSnapshot(nextSnap);
      }
    }
  };

  if (!selectedCell || !snapshot)
    return (
      <div className="insight-dock" role="complementary">
        <div className="ide-panel" style={{height:'100%', display:'flex',justifyContent:'center',alignItems:'center',fontSize:'1.2rem',color:'rgba(180,200,245,0.5)'}}>
          <span>← Select a cell to inspect details</span>
        </div>
      </div>
    );
  if (!cell)
    return <div className="insight-dock"><div className="ide-panel">Cell not found.</div></div>;

  return (
    <div className="insight-dock">
      <div className="ide-panel">
        {/* Tab bar */}
        <div className="ide-tabbar" style={{marginBottom:16}}>
          <button className={`ide-tab${tab==='inspector'?' active':''}`} onClick={()=>setTab('inspector')}>Inspector</button>
          <button className={`ide-tab${tab==='evidence'?' active':''}`} onClick={()=>setTab('evidence')}>Evidence</button>
          <button className={`ide-tab${tab==='definition'?' active':''}`} onClick={()=>setTab('definition')}>Definition</button>
          <button className={`ide-tab${tab==='contradiction'?' active':''}`} onClick={()=>setTab('contradiction')}>Contradiction</button>
        </div>

        {/* Panel content */}
        {tab === 'inspector' && (
          <>
            {/* Heading */}
            <div className="ide-heading" style={{
              color:'#70a7f5',fontSize:'1.18rem',marginBottom:8,letterSpacing:'0.03em',fontFamily:'ui-monospace,SFMono-Regular,Consolas'}}>
              <span style={{fontWeight:500}}>{formatLabel(selectedCell.option_id)}</span>
              <span style={{color:'#8093aa'}}> × </span>
              <span style={{fontWeight:400,fontStyle:'italic',color:'#d4d9f6'}}>{formatLabel(selectedCell.criterion_id)}</span>
            </div>
            <div style={{borderTop:'1.5px solid #29304a', margin:'0 0 13px 0'}}/>

            {/* Weight slider */}
            <div style={{marginBottom:10}}>
              <label style={{fontFamily:'var(--font-mono)',color:'#9dacce',fontSize:'1.02em'}}>Weight</label>
              <div style={{display:'flex',alignItems:'center',gap:14,marginTop:4}}>
                <input
                  type="range"
                  min={-100}
                  max={100}
                  step={1}
                  value={weight}
                  onChange={e => setWeight(clamp(Number(e.target.value)))}
                  style={{flex:1,maxWidth:240}}
                  className="ide-slider"
                />
                <input
                  type="number"
                  min={-100} max={100}
                  value={weight}
                  onChange={e => setWeight(clamp(Number(e.target.value)))}
                  style={{
                    width:45,padding:'2px 6px',marginLeft:10,
                    border:'1.5px solid #22263a',borderRadius:4,
                    background:'#11151c',color:'#e5eaf7',fontFamily:'var(--font-mono)',fontSize:'1rem',
                    textAlign:'center',boxShadow: flash ? '0 0 3px 2px #3b82f6' : undefined
                  }}
                />
              </div>
              <div style={{color:'#525c7c',fontSize:'92%',marginTop:3}}>Drag or type; –100 = max against, +100 = max for</div>
            </div>

            {/* Confidence slider */}
            <div style={{marginBottom:12}}>
              <label style={{fontFamily:'var(--font-mono)',color:'#9dacce',fontSize:'1.02em'}}>Confidence</label>
              <div style={{display:'flex',alignItems:'center',gap:10,marginTop:4}}>
                <input
                  className="ide-slider"
                  type="range" min={0} max={1} step={0.01}
                  value={locConf}
                  onChange={e => setLocConf(Number(e.target.value))}
                  style={{flex:1,maxWidth:180}}
                />
                <span style={{fontFamily:'var(--font-mono)',width:38,textAlign:'right',color:'#a1abce'}}>{locConf.toFixed(2)}</span>
              </div>
              <div style={{color:'#525c7c',fontSize:'91%',marginTop:2}}>0 (low certainty) → 1 (full confidence)</div>
            </div>

            {/* Rationale */}
            <div style={{marginBottom:9}}>
              <label className="ide-label" style={{fontFamily:'var(--font-mono)',color:'#72c6f7'}}>Rationale</label>
              <input
                type="text"
                className="ide-input"
                value={rationale}
                onChange={e => setRationale(e.target.value)}
                onBlur={handleRationaleBlur}
                style={{
                  width:'100%',
                  background:'var(--gray-0)',
                  color:'var(--text-body)',
                  border:'1.5px solid var(--border-strong)',
                  borderRadius:4,
                  fontFamily:'var(--font-sans)',fontSize:'1rem',marginTop:3,padding:'6px 7px'
                }}
                placeholder="Explain-back: Why this value?"
              />
            </div>

            {/* Evidence (legacy preview) */}
            <div style={{marginBottom:8}}>
              <span className="ide-label" style={{color:'#deaaff',verticalAlign:'text-top'}}>Evidence</span>
              <span style={{marginLeft:8,color:'#5978a0',fontSize:'0.95em'}}> (+) attach / drag-drop</span>
              <ul className="evidence-list" style={{marginTop:2}}>
                {evidenceCards.length === 0 &&
                  <li style={{color:'#567'}}> (none attached) </li>
                }
                {evidenceCards.map(e => (
                  <li key={e.id}
                    style={{cursor: 'pointer',color:'#e9eefd'}}
                    title="Double-click for full details"
                  >
                    ● {e.title} &ensp;
                    <span style={{fontFamily:'var(--font-mono)'}}>{e.cred_score.toFixed(2)}</span>{' '}
                    <span style={{
                      fontFamily:'var(--font-mono)',fontSize:'1.18em',
                      color: e.cred_score > 0.7 ? '#36eb8e' : e.cred_score > 0.4 ? '#e0b700' : '#c9372b',
                      fontWeight:600
                    }}>{e.cred_score > 0.7 ? '★' : e.cred_score > 0.4 ? '△' : '✖'}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* History */}
            <div>
              <span className="ide-label" style={{color:'#ffa5ad'}}>History</span>
              <ul className="ide-history-list" style={{
                color:'var(--text-body)',
                fontSize:'1em',padding:'7px 8px',borderRadius:4
              }}>
                <li>
                  {cell.updated_at} (last edit by <b>{cell.updated_by}</b>)
                </li>
              </ul>
            </div>
          </>
        )}
        {tab === 'evidence' && <EvidenceTab />}
        {tab === 'definition' && <DefinitionTab />}
        {tab === 'contradiction' && (
          <div style={{padding:16, color:'#888', fontStyle:'italic'}}>Contradiction panel coming soon…</div>
        )}
      </div>
    </div>
  );
};

export default InsightDock;