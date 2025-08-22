# Interoperability & Interop Header

All agents must prepend the `interop_header` block to their prompt. This header contains provenance, routing hints, doctrine constraints, and audit hooks. Hand-offs should preserve the header, append any new `provenance.inputs`, and record received `citations`.

Do not remove audit hooks. JUNO is the canonical router and audit token incrementer.

Example header usage and minimal responsibilities are in `prompts/_shared`.
