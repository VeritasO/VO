import { readFileSync } from "fs";
import path from "path";
import { db } from "../db";
import { tasks } from "../schema/models/tasks";
import { rituals } from "../schema/models/rituals";

async function main() {
  const p = path.join(__dirname, "../seeds/expansionSeeds.json");
  const data = JSON.parse(readFileSync(p, "utf-8"));
  if (data.tasks?.length) {
    await db.insert(tasks).values(
      data.tasks.map((t: any) => ({
        title: t.title,
        assignedTo: t.agent,
        taskType: t.type,
        source: "system-expansion",
        metadata: t.metadata
      }))
    );
  }
  if (data.rituals?.length) {
    await db.insert(rituals).values(
      data.rituals.map((r: any) => ({
        name: r.name,
        tier: r.tier,
        elements: r.elements
      }))
    );
  }
  console.log("Expansion seeds inserted.");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
