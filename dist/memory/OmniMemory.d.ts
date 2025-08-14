import { Contradiction } from "../cases/Case";
export interface OmniMemory {
    logs: string[];
    contradictions: Contradiction[];
    snapshots: any[];
    write(entry: string): void;
    logContradiction(contradiction: Contradiction): void;
}
export declare const omniMemory: OmniMemory;
//# sourceMappingURL=OmniMemory.d.ts.map