import { pgTable, text, integer, jsonb, timestamp, uuid } from "drizzle-orm/pg-core";

export const rituals = pgTable("rituals", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  tier: text("tier"),
  elements: jsonb("elements"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
