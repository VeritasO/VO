import { CaseContext, Contradiction } from "../cases/Case";
import { DoctrineLibrary } from "../doctrine/Book";
import { OmniMemory } from "../memory/OmniMemory";
import { Protocol } from "../protocols/protocols";
export type AgentID = `A${number}`;
export interface AgentPayload {
    caseContext?: CaseContext;
    doctrine: DoctrineLibrary;
    memory: OmniMemory;
}
export interface AgentResponse {
    summary: string;
    actions: string[];
    contradiction?: Contradiction;
}
export interface Agent {
    id: AgentID;
    name: string;
    glyphs: string[];
    domain: string;
    description: string;
    act(payload: AgentPayload): Promise<AgentResponse>;
    protocols: Protocol[];
    webAccess: "full" | "relay" | "none";
    onContradiction?: (contradiction: Contradiction) => Promise<void>;
}
//# sourceMappingURL=Agent.d.ts.map