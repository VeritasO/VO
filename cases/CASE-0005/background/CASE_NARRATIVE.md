# CASE-0005 — Identity Shadow + Time Desync (Aggregated & Neutral)

## Freeze Notice ({{DOCUMENT1}})
- Bank triggered an automated freeze after KYC vendor reported a high-similarity template match to a watchlist identity (later deemed a collision).
- Resident attempted medication purchase; declines repeated during a 3h window.

## Cross-Border Context
- Processor logged events in UTC; bank ops audited in CET; merchant terminal in CEST; NTP drift detected ({{IMAGE1}}).

## Prior Mismatches (Aggregate) ({{HISTORY1}})
- Two low-severity mismatches in prior year; cleared within 30 minutes; no freeze.
