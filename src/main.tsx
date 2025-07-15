import React from 'react';
import './styles/theme.css'; 
import { createRoot } from 'react-dom/client';
import AppRoot from './components/AppRoot';
import { usePerspectiveStore } from './store/usePerspectiveStore';

const el = document.getElementById('root')!;
createRoot(el).render(<AppRoot />);

usePerspectiveStore.getState().setSnapshot({
  meta: { id: 'demo', created_at: new Date().toISOString(), license_code: 'MIT' },
  agent: { id: 'anon', display_name: 'Demo', identity_tier: 'anon' },
  grid: [
    {
      option_id: 'Option A',
      cells: [
        { criterion_id: 'cost', weight: -20, loc_conf: 0.9, updated_by: 'anon', updated_at: new Date().toISOString() },
        { criterion_id: 'speed', weight:  40, loc_conf: 0.8, updated_by: 'anon', updated_at: new Date().toISOString() }
      ]
    },
    {
      option_id: 'Option B',
      cells: [
        { criterion_id: 'cost',  weight: 15, loc_conf: 0.7, updated_by: 'anon', updated_at: new Date().toISOString() },
        { criterion_id: 'speed', weight: 30, loc_conf: 0.6, updated_by: 'anon', updated_at: new Date().toISOString() }
      ]
    }
  ],
  edges: [],
  evidence: [],
  confidence: 0.5,
  emotion: { valence: 0, arousal: 0 },
  badges: { reputation: 0, license: 'MIT' },
  simulation: null
});
