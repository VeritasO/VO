export abstract class Agent {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly glyphs: string[],
    public readonly domain: string
  ) {}

  /** Execute this agent's core function on the given context. */
  abstract process(context: any): void;

  /** Mirror Clause: Ensures actions remain consistent with core doctrine, triggers reflection if needed. */
  protected enforceMirrorClause(outcome: any): void {
    // In a real system, this would check the outcome against doctrinal invariants.
    // If a contradiction is detected, it could invoke Agent A10 (MIRRA) for reflection.
  }
}
