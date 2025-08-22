import { normalizeCaseInput } from "../intake/normalizeCaseInput";

export function validate(raw: any) {
  const data = normalizeCaseInput(raw);
  // ... then run JSON-schema validation against schemas.CaseInput
  return data;
}
