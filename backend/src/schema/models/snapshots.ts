import { pgTable, serial, text, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";

export const snapshots = pgTable("snapshots", {
  id: serial("id").primaryKey(),
  kind: varchar("kind", { length: 64 }).notNull(),
  payload: jsonb("payload").$type<object | null>().notNull(),
  notes: text("notes").$type<string | null>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
