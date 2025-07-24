export interface EvidenceCard {
    id: string;
    title: string;
    source_url: string;
    cred_score: number;   // 0‑1
    mime: string;
    added_by: string;
    added_at: string;     // ISO‑8601
  }
  
  export interface DrillDown {
    snapshot_id: string;                 // FK → another snapshot in the same vault
    reducer: 'sum' | 'conf_weighted' | 'pareto';
    last_rollup: number;                 // cached value shown in the parent grid
  }

  
  export interface WeightCell {
    criterion_id: string;
    weight: number;
    drilldown?: DrillDown;
    loc_conf: number;
    evidence_id?: string;       // ← retain (legacy)
    evidence_ids?: string[];    // ← new, array for this Phase
    rationale?: string;
    updated_by: string;
    updated_at: string;
  }
  
  export interface CriteriaRow {
    option_id: string;
    cells: WeightCell[];
  }
  
  export interface PerspectiveSnapshot {
    meta: {
      id: string;
      created_at: string;
      parent_snapshot_id?: string;
      fork_of_id?: string;
      license_code: 'MIT' | 'CC-BY-SA' | 'PROPRIETARY';
    };
    agent: {
      id: string;
      display_name: string;
      identity_tier: 'anon' | 'pseudo' | 'verified';
    };
    grid: CriteriaRow[];
    edges: unknown[];          // TODO: Edge interface
    evidence: EvidenceCard[];
    confidence: number;
    emotion: { valence: number; arousal: number };
    badges: { reputation: number; license: string };
    simulation: unknown | null;
  }
  