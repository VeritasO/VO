import { Router } from "express";
import { db } from "../db";
import { biasProfiles } from "../schema/models/biasProfiles";
import { eq } from "drizzle-orm";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const payload = req.body ?? {};
    if (!payload.agent || !payload.model) return res.status(400).json({ error: "agent and model are required" });
    const [row] = await db.insert(biasProfiles).values(payload).returning();
    res.status(201).json(row);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { decisionId, agent } = req.query as { decisionId?: string; agent?: string };
    let rows;
    if (decisionId) {
      rows = await db.select().from(biasProfiles).where(eq(biasProfiles.decisionId, decisionId));
    } else {
      rows = await db.select().from(biasProfiles);
    }
    const filtered = agent ? rows.filter((r: any) => r.agent === agent) : rows;
    res.json(filtered);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
