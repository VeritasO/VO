import asyncio, json
from typing import Any, Dict, Optional, Tuple
import os, time

# HTTP client fallback
try:
    import apify_client
except Exception:
    apify_client = None
try:
    import requests
except Exception:
    requests = None

# Lightweight fallbacks for local import/smoke tests when packages are not installed.
try:
    from apify import Actor
except Exception:  # pragma: no cover - test-time fallback
    class Actor:
        @staticmethod
        async def init():
            return None

        @staticmethod
        async def get_input():
            return {}

        @staticmethod
        async def push_data(_):
            return None

        @staticmethod
        async def set_value(_k, _v):
            return None

        @staticmethod
        async def charge(_):
            return None

        @staticmethod
        async def exit():
            return None

try:
    from crewai import Agent, Task, Crew, LLM
except Exception:  # pragma: no cover - test-time fallback
    class Agent:
        def __init__(self, **kwargs):
            self.kwargs = kwargs

    class Task:
        def __init__(self, description=None, expected_output=None, agent=None):
            self.description = description
            self.expected_output = expected_output
            self.agent = agent

    class Crew:
        def __init__(self, agents=None, tasks=None):
            self.agents = agents or []
            self.tasks = tasks or []

        def kickoff(self):
            # Return a simple JSON string as a stub result
            return '{"notes":"crew stub result"}'

    class LLM:
        def __init__(self, model=None):
            self.model = model

try:
    from crewai_tools import ApifyActorsTool
except Exception:  # pragma: no cover - test-time fallback
    class ApifyActorsTool:
        def __init__(self, actor):
            self.actor = actor

# Use your existing sub-actor folders at repo root (already present):
LYRA_ACTOR  = "veritas-reflection-intake"
AEGIS_ACTOR = "veritas-fairness-audit"
VESTA_ACTOR = "veritas-ritual-suggestor"

def _llm(name: str) -> LLM:
    allowed = {"gpt-4.1", "gpt-4.1-mini", "gpt-4o", "gpt-4o-mini"}
    return LLM(model=name if name in allowed else "gpt-4.1-mini")

def build_juno(model_name: str, options: Dict[str, Any]) -> Agent:
    tools = []
    if options.get("griefScan", True):        tools.append(ApifyActorsTool(LYRA_ACTOR))
    if options.get("runFairnessAudit", True): tools.append(ApifyActorsTool(AEGIS_ACTOR))
    if options.get("ritualSuggest", True):    tools.append(ApifyActorsTool(VESTA_ACTOR))
    return Agent(
        role="JUNO — Veritas Tribunal",
        goal=("Assign a proportional JSS tier; ensure grief/fairness; propose restoration."),
        backstory=("Lead judicial agent in Veritas.O; restoration-first; consent & safety; reversibility."),
        tools=tools, llm=_llm(model_name), verbose=True
    )

def make_task(case_text: str, jurisdiction: Optional[str], options: Dict[str, Any]) -> Task:
    # Improved structured prompt with explicit JSON schema and example
    prompt = f"""
You are JUNO, the Veritas.O judicial agent. You will produce ONLY a JSON object matching the schema at the end.

CASE:
{case_text}

JURISDICTION: {jurisdiction or 'unspecified'}
OPTIONS: {json.dumps(options)}

Context: If available, you will be provided with outputs from helper actors:
- LYRA (grief/narrative themes): { '{lyra}' }
- AEGIS (fairness audit): { '{aegis}' }
- VESTA (ritual suggestion): { '{vesta}' }

Instructions:
1) Summarize harm, needs, safety constraints (short).
2) Assign a JSS tier (S1, S2, S3, ...) with a 1-2 sentence justification.
3) Use LYRA output to explain grief or narrative themes when present.
4) Use AEGIS output to report a fairnessScore between 0 and 1 and list any top citations.
5) Use VESTA output to choose or refine a ritual suggestion and a short repair plan.

Output JSON schema:
{
  "tier": string,            // e.g. "S2"
  "remedy": string,          // recommended remedy
  "fairnessScore": number|null,
  "ritual": string|null,
  "notes": string,
  "citations": [string]
}

Example output:
{
  "tier": "S2",
  "remedy": "Shared Soil + 20 hrs community repair",
  "fairnessScore": 0.92,
  "ritual": "Shared Soil",
  "notes": "Restoration-first; safety plan present.",
  "citations": ["source1", "source2"]
}

Produce the JSON object and nothing else.
"""
    return Task(description=prompt, expected_output="JSON object per schema", agent=None)


async def run_subactor(actor_slug: str, input_body: Dict[str, Any], token: Optional[str]) -> Tuple[Optional[Dict[str, Any]], Optional[str]]:
    """Start an Apify actor run and return the OUTPUT value if possible.
    Returns (result_dict, error_message)
    """
    # Try apify_client if available
    if apify_client and token:
        try:
            client = apify_client.ApifyClient(token=token)
            run = client.acts.run(actor_slug, body={"input": input_body})
            run_id = run['data']['id']
            # Poll run status and then fetch key-value store
            for _ in range(30):
                r = client.acts.get_run(run_id)
                status = r['data']['status']
                if status in ('SUCCEEDED', 'FAILED', 'ABORTED'):
                    break
                time.sleep(1)
            # fetch OUTPUT
            try:
                kv = client.key_value_stores.get_store_record({"storeId": run['data']['stats']['datasetId']})
            except Exception:
                kv = None
            # fallback: return raw run data
            return (r.get('data'), None)
        except Exception as e:
            return (None, str(e))

    # Fallback: use REST API
    if requests and token:
        try:
            url = f"https://api.apify.com/v2/acts/{actor_slug}/runs?token={token}"
            r = requests.post(url, json=input_body, timeout=30)
            r.raise_for_status()
            data = r.json().get('data', {})
            return (data, None)
        except Exception as e:
            return (None, str(e))

    return (None, "no apify client available")

async def main():
    # Actor-run behavior: use Actor runtime to get input, run processing, then push data
    await Actor.init()
    try:
        i: Dict[str, Any] = await Actor.get_input() or {}
        rec = await process_input(i)

        # charges and push (Actor API if available)
        try:
            if rec.get("tier") is not None:
                await Actor.charge({"eventName": "case_scored", "amount": 1})
            if rec.get("fairnessScore") is not None:
                await Actor.charge({"eventName": "audit_completed", "amount": 1})
            if rec.get("ritual") is not None:
                await Actor.charge({"eventName": "ritual_suggested", "amount": 1})
        except Exception:
            pass

        try:
            await Actor.push_data(rec)
            await Actor.set_value("OUTPUT", rec)
        except Exception:
            pass
    finally:
        await Actor.exit()


async def process_input(i: Dict[str, Any]) -> Dict[str, Any]:
    """Process an input dict and return the result record (no Actor push/charge).
    Safe to call from an HTTP server container.
    """
    case_text: str = (i.get("caseNarrative") or "").strip()
    jurisdiction: Optional[str] = (i.get("jurisdiction") or "").strip() or None
    model_name: str = (i.get("modelName") or "gpt-4.1-mini").strip()
    options: Dict[str, Any] = i.get("options") or {}

    if not case_text:
        raise ValueError('Missing "caseNarrative".')

    token = os.environ.get('APIFY_TOKEN')
    lyra_out = aegis_out = vesta_out = None
    if options.get('griefScan', True):
        lyra_in = {"caseNarrative": case_text}
        lyra_out, lyra_err = await run_subactor(LYRA_ACTOR, lyra_in, token)
    if options.get('runFairnessAudit', True):
        aegis_in = {"caseNarrative": case_text, "maxSources": options.get('maxSources', 10)}
        aegis_out, aegis_err = await run_subactor(AEGIS_ACTOR, aegis_in, token)
    if options.get('ritualSuggest', True):
        vesta_in = {"caseNarrative": case_text, "tier": None}
        vesta_out, vesta_err = await run_subactor(VESTA_ACTOR, vesta_in, token)

    # Build JUNO and prepare prompt
    juno = build_juno(model_name, options)
    raw_prompt_task = make_task(case_text, jurisdiction, options)
    subctx = {
        "lyra": lyra_out or {},
        "aegis": aegis_out or {},
        "vesta": vesta_out or {}
    }
    raw_prompt_task.description = raw_prompt_task.description.format(**{k: json.dumps(v) for k, v in subctx.items()})
    raw_prompt_task.agent = juno

    result = Crew(agents=[juno], tasks=[raw_prompt_task]).kickoff()
    raw = getattr(result, "raw", str(result))

    try:
        data = json.loads(raw) if isinstance(raw, str) else raw
        if not isinstance(data, dict):
            data = {"notes": str(data)}
    except Exception:
        data = {"notes": str(raw)}

    rec = {
        "tier": data.get("tier"),
        "remedy": data.get("remedy"),
        "fairnessScore": data.get("fairnessScore"),
        "ritual": data.get("ritual"),
        "notes": data.get("notes"),
        "citations": data.get("citations", []),
        "jurisdiction": jurisdiction
    }

    return rec

if __name__ == "__main__":
    asyncio.run(main())
