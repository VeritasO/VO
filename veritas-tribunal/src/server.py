import asyncio
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Any, Dict
from .main import process_input

app = FastAPI(title="veritas-tribunal API")

class RunInput(BaseModel):
    caseNarrative: str
    jurisdiction: str | None = None
    modelName: str | None = None
    options: Dict[str, Any] | None = None

@app.post('/run')
async def run(input: RunInput):
    try:
        res = await process_input(input.dict())
        return res
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Async startup/shutdown can be added if needed
