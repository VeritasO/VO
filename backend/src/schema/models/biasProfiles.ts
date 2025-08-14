import { pgTable, text, uuid, timestamp, jsonb, integer } from "drizzle-orm/pg-core";

export const biasProfiles = pgTable("bias_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  decisionId: uuid("decision_id"),
  agent: text("agent").notNull(),
  model: text("model").notNull(),
  purpose: text("purpose"),
  stakeholders: jsonb("stakeholders"),
  dataSources: jsonb("data_sources"),
  potentialHarms: jsonb("potential_harms"),
  impactedGroups: jsonb("impacted_groups"),
  mitigations: jsonb("mitigations"),
  evaluationNotes: text("evaluation_notes"),
  riskRating: integer("risk_rating").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
