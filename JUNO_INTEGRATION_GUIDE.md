# JUNO System Integration Guide

1. Get Actor IDs:
   - Open each deployed actor in Apify Console
   - Copy the Actor ID from the URL (format: abc123XYZ)
   - Note them down:
     AEGIS: [Copy ID here]
     LYRA: [Copy ID here]
     VESTA: [Copy ID here]
     JUNO: [Copy ID here]

2. Configure JUNO Tribunal:
   Add these environment variables to the JUNO Tribunal actor:
   ```
   AEGIS_ACTOR_ID=[ID from step 1]
   LYRA_ACTOR_ID=[ID from step 1]
   VESTA_ACTOR_ID=[ID from step 1]
   ```

3. Test Integration:
   Run the JUNO Tribunal actor with this test input:
   ```json
   {
     "caseNarrative": "Test case: A small business owner needs guidance on fair hiring practices.",
     "jurisdiction": "NY, USA",
     "modelName": "gpt-4.1-mini",
     "options": {
       "griefScan": true,
       "runFairnessAudit": true,
       "ritualSuggest": true
     }
   }
   ```

4. Verify each component:
   - Check AEGIS output for fairness analysis
   - Verify LYRA processed emotional context
   - Confirm VESTA provided ritual suggestions
   - Ensure JUNO coordinated all responses

5. Monitor the system:
   - Check actor logs for any errors
   - Verify environment variables are working
   - Confirm cross-actor communication
