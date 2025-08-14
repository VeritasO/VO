import cron from "node-cron";
import { db } from "./db";
import { biasProfiles } from "./schema/models/biasProfiles";

export function startCvtCron() {
  cron.schedule("0 9 * * 1", async () => {
    try {
      await db.insert(biasProfiles).values({
        agent: "TEMPUS",
        model: "veritas-v6-core",
        purpose: "IEEE-7003 lifecycle checkpoint",
        stakeholders: [{ group: "system", role: "operator" }],
        evaluationNotes: "Scheduled CVT checkpoint",
        riskRating: 0,
      });
      console.log("[CVT] weekly bias-profile checkpoint written");
    } catch (e) {
      console.error("[CVT] checkpoint error", e);
    }
  }, { timezone: "America/New_York" });
}
