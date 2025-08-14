export declare abstract class Agent {
    readonly id: string;
    readonly name: string;
    readonly glyphs: string[];
    readonly domain: string;
    constructor(id: string, name: string, glyphs: string[], domain: string);
    /** Execute this agent's core function on the given context. */
    abstract process(context: any): void;
    /** Mirror Clause: Ensures actions remain consistent with core doctrine, triggers reflection if needed. */
    protected enforceMirrorClause(outcome: any): void;
}
//# sourceMappingURL=Agent.d.ts.map