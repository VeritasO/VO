# Dashboard Spec v1.0 — Restoration Docket

## Goal
Real‑time transparency and auditability for the Restoration Docket, with bias/fairness monitoring and case flow visibility.

## KPIs & Views

### System Banner (Policy Headwinds vs Evidence)
- Inputs: qualitative dials with notes
- Output: dual stacks for headwinds and evidence

### Fairness Drift (AEGIS)
- Definition: normalized weekly average of bias profile risk ratings (0–5 scaled to 0–100)
- Chart: weekly line with threshold bands (warn/alert)

### Case Funnel
- Stages: Intake → Eligible → Offer → Accepted → Agreement → Completed → Re‑opened
- Metrics: counts per stage; median days in stage

### Completion & Timeliness
- On‑time completion; avg days to closure; overdue alerts

### Recurrence
- 3/6/12‑month re‑offense rates with confidence intervals

### Survivor Outcomes
- Meaning Restored & Safety Felt indices (0–100)

### Repair Outputs
- Community hours, ecological projects, restitution delivered

### Consent & Safety
- Percent with signed rights sheet; safety screen pass rate; incidents tracker

### Equity Lens
- Diversion/closure and time‑to‑restoration by protected group; drift alarms if |Δ| > 5%

## Data Model (minimal)
- `cases(id, intake_ts, source, charge_type, severity_band, status, cohort_key)`
- `agreements(id, case_id, start_ts, due_ts, closure_ts, status, obligations_json)`
- `bias_profiles(...)` (see schema file)
- `surveys(id, case_id, role, kind, score, created_at)`
- `repairs(id, case_id, category, qty, unit, verified_by, verified_ts)`
- `events(id, case_id, kind, payload_json, created_at)`

## API Contracts
- GET /api/metrics/system-dials
- GET /api/aegis/fairness-drift
- GET /api/cases/funnel
- GET /api/cases/equity
- GET /api/repairs/summary
- GET /api/surveys/outcomes
- POST /api/bias-profiles
- POST /api/cases/:id/events

## Widgets
- SystemBanner: { headwinds, evidence }
- FairnessDriftChart
- CaseFunnel
- EquityPanel
- OutcomesPanel
- RepairsMap/List

## Roles & Permissions
- Admin: full R/W and exports
- Partner: read and write events for their cases
- Public: aggregate monthly snapshot only

## Refresh & Integrity
- Near‑real‑time writes, dashboard refresh every 10 min, daily snapshot at 23:59
- Audit: immutable event log with CVT timestamps; bias profile required at decision endpoints

## Accessibility
- WCAG AA; keyboard navigation; alt text for charts

## Example payloads
- fairness drift
  { "series": [{"week":"2025-07-07","value":42},{"week":"2025-07-14","value":55}] }
- system dials
  { "headwinds":[{"label":"RJ school policy","value":65}], "evidence":[{"label":"RCT youth felonies","value":80}] }

---

Next steps
1. Add `bias_profiles` table to migrations and run DB migration.
2. Wire frontend widgets to the API endpoints.
3. Seed expansion tasks and rituals.
4. Run CVT weekly checkpoint cron and confirm entries.
