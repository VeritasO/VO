import asyncio
import json
from typing import Any, Dict

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
        async def exit():
            return None

"""
Simple LYRA stub: extracts basic grief/reflection themes from a case narrative.
This intentionally avoids external LLM calls so it's safe to run locally as a placeholder.
"""

KEYWORDS = {
    "bereavement": ["loss", "death", "bereavement", "funeral", "lost"],
    "anger": ["angry", "rage", "fight", "violence", "assault"],
    "fear": ["threat", "afraid", "unsafe", "fear", "threats"],
    "guilt": ["sorry", "guilty", "remorse", "remorseful"]
}

def extract_themes(text: str) -> Dict[str, Any]:
    t = text.lower()
    found = []
    snippets = []
    for theme, kws in KEYWORDS.items():
        for k in kws:
            if k in t:
                found.append(theme)
                snippets.append(k)
                break
    return {"themes": sorted(set(found)), "snippets": snippets}

async def main():
    await Actor.init()
    try:
        inp = await Actor.get_input() or {}
        narrative = (inp.get("caseNarrative") or "").strip()
        if not narrative:
            raise ValueError("Missing caseNarrative input")

        result = extract_themes(narrative)
        out = {
            "themes": result["themes"],
            "snippets": result["snippets"],
            "notes": "LYRA stub: lightweight theme extraction (no LLM)"
        }

        await Actor.push_data(out)
        await Actor.set_value("OUTPUT", out)
    finally:
        await Actor.exit()

if __name__ == "__main__":
    asyncio.run(main())
