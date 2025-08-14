import { CaseContext, Contradiction } from "./Case";
export declare function detectContradictions(caseContext: CaseContext, doctrine: any): Contradiction[];
export declare function checkBias(caseContext: CaseContext): boolean;
export declare function createContradiction(summary: string, severity: "low" | "medium" | "high", agents: string[], books: number[]): Contradiction;
//# sourceMappingURL=contradictionUtils.d.ts.map