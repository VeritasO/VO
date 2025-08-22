import { pgTable, serial, text, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";

export const snapshots = pgTable("snapshots", {
  id: serial("id").primaryKey(),
  kind: varchar("kind", { length: 64 }).notNull(),
  // jsonb typing helper ($type) may not be available in this drizzle version; treat as unknown
  payload: jsonb("payload").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
