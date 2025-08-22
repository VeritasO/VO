export type CaseStatus = "open" | "in_reflection" | "resolved";
export interface Contradiction {
    id: string;
    summary: string;
    severity: "low" | "medium" | "high";
    agentsInvolved: string[];
    doctrinalRefs: number[];
    resolved: boolean;
}
export interface CaseContext {
    id: string;
    summary: string;
    involvedAgents: string[];
    booksApplied: number[];
    status: CaseStatus;
    contradictions: Contradiction[];
    timeline: string[];
    data?: Record<string, any>;
}
//# sourceMappingURL=Case.d.ts.map