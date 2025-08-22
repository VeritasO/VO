import { Actor } from 'apify';
import { normalizeCaseInput } from "./intake/normalizeCaseInput.js";

function requireFields(raw: any) {
  const input = normalizeCaseInput(raw ?? {});
  for (const k of ["caseNarrative","jurisdiction","model"]) {
    if (!input[k]) throw new Error(`Missing required field: ${k}`);
  }
  return input;
}

// Example usage at the start of your main function:
async function main() {
  await Actor.init();
  const input = await requireFields(await Actor.getInput());
  // ... rest of your actor logic
  await Actor.exit();
}
