// src/intake/normalizeCaseInput.ts
type Any = Record<string, any>;

const MAP: Record<string, string> = {
  "Case Narrative": "caseNarrative",
  "Jurisdiction": "jurisdiction",
  "Model": "model",
  "Processing Options (optional)": "processingOptions"
};

export function normalizeCaseInput(input: Any): Any {
  const out: Any = { ...input };
  for (const [from, to] of Object.entries(MAP)) {
    if (out[from] !== undefined && out[to] === undefined) {
      out[to] = out[from];
      delete out[from];
    }
  }
  return out;
}
