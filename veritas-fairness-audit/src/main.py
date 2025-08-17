import asyncio
import json
from typing import Any, Dict

from apify import Actor

"""
AEGIS stub: produces a fairnessScore in 0..1 and optional placeholder citations.
This is deterministic and avoids LLM calls so it's safe for immediate testing.
"""

BIAS_KEYWORDS = ["race", "gender", "disability", "class", "immigrant", "religion"]

def compute_fairness(text: str) -> Dict[str, Any]:
    t = text.lower()
    hits = sum(1 for k in BIAS_KEYWORDS if k in t)
    # Lower hits => higher fairness score (simple heuristic)
    score = max(0.0, 1.0 - min(1.0, hits / 3.0))
    citations = []
    if hits:
        citations = [f"note: potential mention of '{k}'" for k in BIAS_KEYWORDS if k in t][:3]
    return {"fairnessScore": round(score, 3), "citations": citations}

async def main():
    await Actor.init()
    try:
        inp = await Actor.get_input() or {}
        narrative = (inp.get("caseNarrative") or "").strip()
        if not narrative:
            raise ValueError("Missing caseNarrative input")

        res = compute_fairness(narrative)
        out = {"fairnessScore": res["fairnessScore"], "citations": res["citations"], "notes": "AEGIS stub"}

        await Actor.push_data(out)
        await Actor.set_value("OUTPUT", out)
    finally:
        await Actor.exit()

if __name__ == "__main__":
    asyncio.run(main())
