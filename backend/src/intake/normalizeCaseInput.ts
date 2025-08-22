type AnyObj = Record<string, any>;

const FIELD_MAP: Record<string, string> = {
  "Case Narrative": "case_narrative",
  "Jurisdiction": "jurisdiction",
  "Model": "model"
};

export function normalizeCaseInput(input: AnyObj): AnyObj {
  const out: AnyObj = { ...input };
  for (const [from, to] of Object.entries(FIELD_MAP)) {
    if (out[from] !== undefined && out[to] === undefined) {
      out[to] = out[from];
      delete out[from];
    }
  }
  return out;
}
