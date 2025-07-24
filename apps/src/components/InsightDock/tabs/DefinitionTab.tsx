import React from "react";
import { usePerspectiveStore } from "../../../store/usePerspectiveStore";
import { formatLabel } from "../../../utils/formatLabel";

/**
 * MVP: Just shows the definition of the selected criterion, if present in a placeholder core concept lib.
 *
 * Expand later: load from JSON, allow edit, add spectrum slider, history/nuance, etc.
 */

// Simple MVP mock ontology / concept definitions (real: load JSON)
const CORE_DEFINITIONS: Record<string, string> = {
  career_focus_alignment:
    "The degree to which your current work, projects, or study trajectories match long-term professional ambitions.",
  emotional_support_gain:
    "The net benefit you expect in resilience and emotional wellbeing from this relationship.",
  time_flexibility_loss:
    "The reduction in control over how you allocate free or unstructured time as a result of this choice.",
  creative_energy_synergy:
    "The degree to which collaboration boosts innovative output, or enables personal projects.",
  financial_resilience: "Ability to absorb financial shocks and maintain basic security.",
  personal_growth_curve:
    "The expected pace and quality of self-improvement, skill acquisition, and personal transformation over time.",
  focus_distraction_risk: "Potential for decreased concentration on goals due to external factors.",
  mental_health_stability: "Baseline expected state of psychological wellbeing and calm.",
  network_expansion: "Opportunities to extend your personal or professional network as a result of this decision.",
  autonomy_value: "The subjective importance attached to self-governance and independence of action.",
  mission_alignment: "Degree to which the option fits with your core values or life purpose.",
  therapy_consistency:
    "Likelihood that you will maintain habits-of-improvement or external support relationships.",
  risk_of_misalignment:
    "Probability that goal misfits, value incompatibilities, or conflicts will occur later.",
  serendipity_opportunity:
    "Chance of unexpected good outcomes, beneficial surprises, or emergent wins.",
};

// Optionally, allow users/facilitators to extend this per domain.

const DefinitionTab: React.FC = () => {
  const selectedCell = usePerspectiveStore((s) => s.selectedCell);

  if (!selectedCell)
    return (
      <div style={{ padding: 8, color: "#888" }}>
        No cell selected.
      </div>
    );

  // Use your formatLabel util for prettified criterion
  const rawId = selectedCell.criterion_id;
  const label = formatLabel(rawId);

  // Lookup
  const definition = CORE_DEFINITIONS[rawId];

  return (
    <div style={{ padding: "20px 12px" }}>
      <div style={{ fontWeight: 700, fontSize: "1.15em", marginBottom: 8 }}>
        <span style={{ color: "#6767ec" }}>{label}</span>
      </div>
      <hr style={{ border: 0, borderTop: "1px solid #ececec", margin: "10px 0 18px" }}/>
      {definition ? (
        <div
          style={{
            fontSize: "1.025em",
            lineHeight: 1.6,
            color: "#444",
            background: "#f8faff",
            borderRadius: 5,
            padding: "12px 16px",
            boxShadow: "0 2px 6px #f2f2f2",
          }}
        >
          <span style={{ opacity: 0.66, fontWeight: 500 }}>Definition:</span>
          <br />
          <span>{definition}</span>
        </div>
      ) : (
        <div
          style={{
            color: "#b98",
            fontStyle: "italic",
            background: "#fefbec",
            borderRadius: 5,
            padding: "10px 13px",
            marginTop: 4,
            border: "1px solid #ecd38a",
          }}
        >
          <span>
            No canonical definition for <b>{label}</b> in core library.
          </span>
          <div style={{ marginTop: 7, fontSize: "0.98em", color: "#c97" }}>
            <span>• Click "Edit" to propose a definition (coming soon)</span>
          </div>
        </div>
      )}
      <div style={{ marginTop: 22, opacity: 0.7, fontSize: "0.93em" }}>
        <span style={{ color: "#aaa", fontWeight: 400 }}>
          <span role="img" aria-label="info">ℹ️</span>
          &nbsp;Future: Add nuance slider, context tags, edit history, semantic diff.
        </span>
      </div>
    </div>
  );
};

export default DefinitionTab;