// Generated TypeScript types based on case-v5_3_5.json schema
// Veritas Case Schema v5.3.5

export type Timestamp = string; // ISO-8601 with timezone
export type DurationISO8601 = string; // ISO-8601 duration
export type Score0to100 = number; // 0-100
export type UUID = string; // UUID format
export type AgentRef = "JUNO" | "AEGIS" | "KAIROS" | "LYRA" | "ORION" | "THALEA" | "VESTA";

export interface Money {
  amount: number;
  currency: string; // 3-letter currency code
}

export interface Party {
  party_id: UUID;
  role: "harmed" | "responsible" | "witness" | "community" | "observer" | "facilitator";
  display_name: string;
  contact?: {
    email?: string;
    phone?: string;
  };
  language_prefs?: string[];
  access_needs?: string[];
  representation?: {
    advocate_id: UUID;
    notes?: string;
  };
}

export interface ConsentMatrix {
  visibility: "sealed" | "parties-only" | "panel" | "public-summary";
  pacing: "asynchronous" | "scheduled" | "participant-paced";
  topics: {
    allowed?: string[];
    restricted?: string[];
  };
  privacy_flags: ("no-biometric" | "no-location" | "no-financial" | "no-redistribution" | "anonymize-public")[];
  revocation_policy: {
    can_revoke: boolean;
    notice_period: DurationISO8601;
  };
}

export interface EvidenceItem {
  evidence_id: UUID;
  kind: "document" | "media" | "sensor" | "testimony" | "expert-opinion" | "other";
  uri?: string;
  hash?: string;
  provenance: string;
  reliability: Score0to100;
  notes?: string;
}

export interface NarrativeCapture {
  modes: ("text" | "audio" | "video" | "symbolic")[];
  summary: string;
  attachments?: EvidenceItem[];
}

export interface IntakePhase {
  narrative: NarrativeCapture;
  harm_statement: string;
  needs_statement: string;
  narrative_dignity_score: Score0to100;
  intake_agent?: AgentRef;
  timestamp?: Timestamp;
}

export interface Contradiction {
  statement_a: string;
  statement_b: string;
  detected_by: "engine" | "party" | "agent";
  severity?: Score0to100;
}

export interface EvidencePhase {
  items: EvidenceItem[];
  contradictions: Contradiction[];
  context_notes: string;
}

export interface HarmScorepack {
  emotional: Score0to100;
  physical: Score0to100;
  economic: Score0to100;
  notes?: string;
}

export interface HarmNeedMap {
  human_harm: HarmScorepack;
  community_harm: HarmScorepack;
  ecological_harm: HarmScorepack;
  temporal: {
    grief_clock: DurationISO8601;
    delay_cost?: Score0to100;
    urgency_score: Score0to100;
  };
  systemic_links: string[];
}

export interface FairnessAudit {
  bias_scan: {
    methods: ("counterfactual" | "subgroup" | "calibration" | "abstention")[];
    flags: string[];
  };
  uncertainty: {
    confidence_pct: Score0to100;
    uncertainty_budget: Score0to100;
  };
  mitigation_plan: string[];
  expected_outcome_parity: Score0to100;
}

export interface Checkpoint {
  name: string;
  gate: {
    condition: string;
    verified_by: AgentRef | "panel";
  };
  actions_on_fail: string[];
}

export interface Escrow {
  enabled: boolean;
  funds?: Money;
  release_policy?: string;
  rollback_policy?: string;
}

export interface MeasurementPlan {
  repair_targets: string[];
  metrics: {
    name: string;
    target: Score0to100;
    method: string;
  }[];
}

export interface Obligation {
  obligation_id: UUID;
  kind: "restitution" | "service" | "access" | "education" | "mediation" | "stewardship" | "symbolic_rite" | "policy_change" | "other";
  parameters: Record<string, any>;
  timeline: {
    start: Timestamp;
    target_completion: Timestamp;
    pacing?: DurationISO8601;
  };
  reversibility: {
    level: "Full" | "Layered" | "Escrowed" | "Conditional";
    checkpoints: Checkpoint[];
  };
  escrow?: Escrow;
  measurement?: MeasurementPlan;
}

export interface RulingHypothesis {
  hypothesis_id: UUID;
  label?: string;
  obligations: Obligation[];
  repair_forecast: {
    expected_repair_score: Score0to100;
    time_to_repair: DurationISO8601;
  };
  fairness_score: Score0to100;
  reversibility_plan: {
    summary: string;
    global_checkpoints: Checkpoint[];
  };
  risk_map: string[];
  narrative_impact: {
    dignity_score: Score0to100;
    notes: string;
  };
}

export interface ReconciliationOption {
  option_id: UUID;
  kind: "narrative_mediation" | "restitution_access" | "learning_for_repair" | "community_stewardship" | "symbolic_structural_rite" | "custom";
  bundle: Obligation[];
  scores: {
    repair_curve: Score0to100;
    fairness_index: Score0to100;
    emotional_compatibility: Score0to100;
    reversibility_ease: Score0to100;
  };
}

export interface SelectionConsent {
  selection_mode: "consensus" | "majority" | "hybrid";
  votes: {
    party_id: UUID;
    option_id: UUID;
    timestamp: Timestamp;
  }[];
  modifications?: string;
  consent_lock: {
    locked: boolean;
    conditions: string;
  };
}

export interface ActivationPhase {
  smart_obligations: Obligation[];
  observers: string[];
  live_repair_tracking: {
    enabled: boolean;
    dashboard_uri: string;
  };
}

export interface Appeal {
  type: "evidence" | "fairness" | "dignity" | "timing";
  submitted_by: UUID;
  timestamp: Timestamp;
  grounds: string;
}

export interface ReviewAdaptation {
  triggers: ("new_evidence" | "harm_drift" | "bias_drop" | "distress_signal" | "time_gate")[];
  appeals: Appeal[];
  rollback: {
    policy: string;
    can_execute: boolean;
    executed_at: Timestamp | null;
  };
}

export interface ClosurePhase {
  final_repair_score: Score0to100;
  attestations: {
    proof_of_reason_uri: string;
    rights_compliance: string;
    narrative_closure: string;
  };
  archive: {
    immutable_log_uri: string;
    reseal_rights: {
      can_reseal: boolean;
      conditions: string;
    };
  };
}

export interface SystemAuditHooks {
  case_counter: number;
  scheduled_audit_after_n_cases: number;
  hooks: ("AEGIS_bias_drift" | "ORION_doctrine_consistency" | "VESTA_rite_evolution" | "KAIROS_grief_pacing" | "JUNO_contradiction_review")[];
}

export interface ProofOfReasonPack {
  inputs: string[];
  weights: number[];
  fairness_diagnostics: string;
  counterfactuals: string;
  plain_summary: string;
}

export interface VeritasCase {
  version: "v5.3.5";
  case_id: string;
  case_tier: number; // 0-4
  initiation_cvt: Timestamp;
  labels?: string[];
  parties: Party[];
  consent: ConsentMatrix;
  review_interval: DurationISO8601;
  reversibility_level: "Full" | "Layered" | "Escrowed" | "Conditional";
  intake: IntakePhase;
  evidence: EvidencePhase;
  harm_need_map: HarmNeedMap;
  fairness_audit: FairnessAudit;
  ruling_hypotheses: RulingHypothesis[];
  reconciliation_menu: ReconciliationOption[];
  selection_consent: SelectionConsent;
  activation: ActivationPhase;
  review_adaptation: ReviewAdaptation;
  closure: ClosurePhase;
  system_audit_hooks: SystemAuditHooks;
  explainability?: ProofOfReasonPack;
}

// Utility types for common operations
export type CaseStatus = "intake" | "evidence" | "deliberation" | "selection" | "activation" | "review" | "closed";
export type PartyRole = Party["role"];
export type ObligationKind = Obligation["kind"];
export type ReconciliationKind = ReconciliationOption["kind"];

// Helper functions for working with cases
export const getCaseStatus = (veritasCase: VeritasCase): CaseStatus => {
  if (veritasCase.closure.final_repair_score !== undefined) return "closed";
  if (veritasCase.review_adaptation.appeals.length > 0) return "review";
  if (veritasCase.activation.smart_obligations.length > 0) return "activation";
  if (veritasCase.selection_consent.consent_lock.locked) return "selection";
  if (veritasCase.ruling_hypotheses.length > 0) return "deliberation";
  if (veritasCase.evidence.items.length > 0) return "evidence";
  return "intake";
};

export const getPartiesByRole = (veritasCase: VeritasCase, role: PartyRole): Party[] => {
  return veritasCase.parties.filter(party => party.role === role);
};

export const calculateOverallRepairScore = (veritasCase: VeritasCase): number => {
  const { human_harm, community_harm, ecological_harm } = veritasCase.harm_need_map;
  
  const avgEmotional = (human_harm.emotional + community_harm.emotional + ecological_harm.emotional) / 3;
  const avgPhysical = (human_harm.physical + community_harm.physical + ecological_harm.physical) / 3;
  const avgEconomic = (human_harm.economic + community_harm.economic + ecological_harm.economic) / 3;
  
  return (avgEmotional + avgPhysical + avgEconomic) / 3;
};
