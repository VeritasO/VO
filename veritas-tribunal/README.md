# Veritas.O — JUNO Tribunal (Apify + CrewAI)

JUNO scores a case (JSS), checks fairness (AEGIS), integrates grief/narrative (LYRA), and suggests a ritual (VESTA). Runs as an Apify Actor with Pay-Per-Event monetization.

## Inputs
- caseNarrative (string, required)
- jurisdiction (string, optional)
- modelName (enum)
- options: { griefScan, runFairnessAudit, ritualSuggest, maxSources }

## Outputs
Dataset row:
{
  "tier": "S2",
  "remedy": "Shared Soil + 20 hrs community repair",
  "fairnessScore": 0.92,
  "ritual": "Shared Soil",
  "notes": "Restoration-first; safety plan present.",
  "jurisdiction": "NY, USA"
}

## Local run
apify login
OPENAI_API_KEY="sk-..." apify run --input '{
  "caseNarrative":"Two students fought...",
  "jurisdiction":"NY, USA",
  "modelName":"gpt-4.1-mini",
  "options":{"griefScan":true,"runFairnessAudit":true,"ritualSuggest":true}
}'

## Deploy
apify push

## HTTP server (ChatGPT container)
Build and run a container that exposes an HTTP POST /run endpoint (useful for ChatGPT plugins or local testing):

```bash
# Build & run
./scripts/run_juno_container.sh

# POST example
curl -sS -X POST http://localhost:8080/run -H "Content-Type: application/json" -d '{"caseNarrative":"Two students fought..."}' | jq
```

The container listens on port 8080 and uses `process_input` internally (no Actor push/charges).

## Programmatic sub-actors
This actor will call helper actors (`veritas-reflection-intake`, `veritas-fairness-audit`, `veritas-ritual-suggestor`) via the Apify API when `APIFY_TOKEN` is present in the environment. Their outputs are merged into JUNO's CrewAI prompt so JUNO can reason over grief themes, fairness signals, and ritual suggestions.

## CI Deploy
The repo contains `.github/workflows/apify-deploy.yml` which deploys the actor on tagged releases (`v*`). Ensure `APIFY_TOKEN` is stored in GitHub Secrets before pushing a tag.
