// memory/OmniMemory.ts
import { Contradiction } from "../cases/Case";

export interface OmniMemory {
  logs: string[];
  contradictions: Contradiction[];
  snapshots: any[];
  write(entry: string): void;
  logContradiction(contradiction: Contradiction): void;
}

export const omniMemory: OmniMemory = {
  logs: [],
  contradictions: [],
  snapshots: [],
  write(entry) {
    this.logs.push(`[${new Date().toISOString()}] ${entry}`);
  },
  logContradiction(contradiction) {
    this.contradictions.push(contradiction);
    this.write(`Contradiction logged: ${contradiction.summary}`);
  }
};
