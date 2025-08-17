import db from "./db";
import { snapshots } from "./schema/models/snapshots";
import dayjs from "dayjs";

export async function collectSnapshot(kind: string, payload: object, notes?: string) {
  const entry = {
    kind,
    payload,
    notes: notes || null,
    createdAt: dayjs().toISOString(),
  } as any;

  try {
    const [row] = await db.insert(snapshots).values(entry).returning();
    return row;
  } catch (e) {
    console.error("Failed to save snapshot", e);
    throw e;
  }
}
