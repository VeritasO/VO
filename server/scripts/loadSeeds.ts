import { readFileSync } from "fs";
import path from "path";

// Try to import the existing backend db; adjust path if your project layout differs
let db: any;
try {
  // backend/src/db.ts exports `db`
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  db = require(path.join(__dirname, "../../backend/src/db.js")).db || require(path.join(__dirname, "../../backend/src/db")).db;
} catch (e) {
  console.warn("Could not load backend db from ../../backend/src/db.js or ../../backend/src/db. Make sure the path is correct.");
}

function load(file: string) {
  const p = path.join(__dirname, "../seeds", file);
  return JSON.parse(readFileSync(p, "utf-8"));
}

async function main() {
  const a = load("agents.A1-A21.json");
  const r = load("rituals.seed.json");
  const t = load("tasks.seed.json");
  const dash = load("dashboard.seed.json");
  const cases = load("cases.min.seed.json");
  const bias = load("bias_profiles.seed.json");
  const surveys = load("surveys.seed.json");
  const repairs = load("repairs.seed.json");

  if (!db) {
    console.log("No db detected; printing seed counts instead of inserting.");
    console.log({ agents: a.length, rituals: r.length, tasks: t.length });
    return;
  }

  // Attempt to load model references from backend schema; these imports may need path adjustments
  let agentsModel: any, ritualsModel: any, tasksModel: any, biasModel: any, surveysModel: any, repairsModel: any, casesModel: any;
  try {
    agentsModel = require(path.join(__dirname, "../../backend/src/schema/models/agents")).agents;
  } catch {}
  try {
    ritualsModel = require(path.join(__dirname, "../../backend/src/schema/models/rituals")).rituals;
  } catch {}
  try {
    tasksModel = require(path.join(__dirname, "../../backend/src/schema/models/tasks")).tasks;
  } catch {}
  try {
    biasModel = require(path.join(__dirname, "../../backend/src/schema/models/biasProfiles")).bias_profiles;
  } catch {}
  try {
    surveysModel = require(path.join(__dirname, "../../backend/src/schema/models/surveys")).surveys;
  } catch {}
  try {
    repairsModel = require(path.join(__dirname, "../../backend/src/schema/models/repairs")).repairs;
  } catch {}
  try {
    casesModel = require(path.join(__dirname, "../../backend/src/schema/models/cases")).cases;
  } catch {}

  if (Array.isArray(a) && agentsModel) await db.insert(agentsModel).values(a);
  if (Array.isArray(r) && ritualsModel) await db.insert(ritualsModel).values(r);
  if (Array.isArray(t) && tasksModel) await db.insert(tasksModel).values(t);
  if (Array.isArray(bias) && biasModel) await db.insert(biasModel).values(bias);
  if (Array.isArray(surveys) && surveysModel) await db.insert(surveysModel).values(surveys);
  if (Array.isArray(repairs) && repairsModel) await db.insert(repairsModel).values(repairs);
  if (Array.isArray(cases) && casesModel) await db.insert(casesModel).values(cases);

  console.log("Seeds processed.");
}

main().catch(e => { console.error(e); process.exit(1); });
