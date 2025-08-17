import asyncio
import json
from typing import Any, Dict

from apify import Actor

"""
VESTA stub: choose a ritual by tier and provide a concise repair plan.
"""

RITUAL_MAP = {
    "S1": {"ritual": "Quiet Witness", "repair": "Low-risk family/community repair, <=10 hrs"},
    "S2": {"ritual": "Shared Soil", "repair": "Community-mediated repair, 10-40 hrs"},
    "S3": {"ritual": "Circle of Return", "repair": "High-stakes mentor circle + long-form repair"}
}

def suggest(tier: str, narrative: str) -> Dict[str, Any]:
    t = tier if tier in RITUAL_MAP else "S2"
    base = RITUAL_MAP.get(t, RITUAL_MAP["S2"]).copy()
    # short heuristic: if narrative mentions community, emphasize ecological repair
    if "community" in narrative.lower() or "garden" in narrative.lower():
        base["repair"] += "; include community soil/planting activity"
    return base

async def main():
    await Actor.init()
    try:
        inp = await Actor.get_input() or {}
        narrative = (inp.get("caseNarrative") or "").strip()
        tier = (inp.get("tier") or "S2").strip()
        if not narrative:
            raise ValueError("Missing caseNarrative input")

        res = suggest(tier, narrative)
        out = {"ritual": res["ritual"], "repairPlan": res["repair"], "notes": "VESTA stub"}

        await Actor.push_data(out)
        await Actor.set_value("OUTPUT", out)
    finally:
        await Actor.exit()

if __name__ == "__main__":
    asyncio.run(main())
