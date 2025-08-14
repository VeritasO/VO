import fs from "fs";
import path from "path";
import dayjs from "dayjs";

const SPEC_PATH = path.resolve(__dirname, "../config/growth_engine.json");
const OUT_DIR = path.resolve(__dirname, "../data/growth_logs");
const PORTAL_FEED = path.resolve(__dirname, "../../../frontend/public/growth_feed.json");

type GrowthItem = {
  agent: string;
  summary: string;
  insights?: string[];
  region?: string;
  date?: string;
  source?: string;
  book_ref?: string[];
  justice_tier?: "low" | "medium" | "high" | "extreme";
  harm_type?: "property" | "violent" | "sexual" | "white_collar" | "digital" | "environmental" | "symbolic";
  confidence?: number;
};

type Contradiction = {
  id: string;
  description: string;
  severity: number;
  proposals: string[];
  agents_involved?: string[];
};

type DoctrineUpdate = {
  id: string;
  book: string;
  change: string;
  rationale?: string;
  agent_source: string;
};

function readSpec() { 
  return JSON.parse(fs.readFileSync(SPEC_PATH, "utf8")); 
}

function ensureDir(p: string) { 
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }); 
}

// Enhanced GPT integration - replace with actual OpenAI when ready
async function askGPT(system: string, user: string): Promise<string> {
  console.log(`[Growth Engine] Processing GPT query for: ${user.split('\n')[0]}`);
  
  // Simulate OpenAI API call - replace this block with actual OpenAI integration
  const agentMatch = user.match(/AGENT: (\w+)/);
  const agent = agentMatch?.[1] || "UNKNOWN";
  
  const mockResponses = generateEnhancedMockData(agent);
  
  return JSON.stringify(mockResponses);
}

function buildSystemPrompt(): string {
  return (
    "You are Veritas.O Growth Agent operating under the Doctrine of Meaningful Thought. " +
    "Your role is to gather, analyze, and synthesize knowledge for the advancement of restorative justice practices. " +
    "Return JSON objects matching the provided output shape. Always cite sources and dates. " +
    "Flag contradictions for MIRRA review and propose doctrinal updates for JUNO approval when warranted. " +
    "Maintain high standards for evidence quality, cultural sensitivity, and ethical consideration. " +
    "Focus on practical applications that can improve real-world justice outcomes."
  );
}

function buildUserPrompt(agent: string, queries: string[], tagging: any): string {
  return [
    `AGENT: ${agent}`,
    "",
    "MISSION CONTEXT:",
    "You are conducting knowledge acquisition for the Veritas.O Growth Engine.",
    "Focus on evidence-based findings that advance restorative justice practices.",
    "",
    "QUERIES:",
    ...queries.map((q, i) => `${i + 1}. ${q}`),
    "",
    "OUTPUT FORMAT:",
    "Return JSON with structure:",
    JSON.stringify({
      items: [
        {
          agent: agent,
          summary: "Concise description of finding",
          insights: ["Key insight 1", "Key insight 2"],
          region: "Geographic/cultural region",
          date: "YYYY-MM-DD",
          source: "Citation or URL with credible attribution",
          book_ref: ["Book II", "Book V"],
          justice_tier: "low|medium|high|extreme",
          harm_type: "property|violent|sexual|white_collar|digital|environmental|symbolic",
          confidence: 0.85
        }
      ],
      contradictions: agent === "MIRRA" ? [
        {
          id: `mirra-${Date.now()}`,
          description: "Description of doctrinal contradiction",
          severity: 1,
          proposals: ["Resolution option 1", "Resolution option 2"]
        }
      ] : undefined,
      doctrine_updates: agent === "JUNO" ? [
        {
          id: `juno-${Date.now()}`,
          book: "Book name",
          change: "Specific doctrinal change",
          rationale: "Justification for change"
        }
      ] : undefined
    }, null, 2),
    "",
    "REQUIREMENTS:",
    "- Include credible source and recent date for all items",
    "- Confidence score between 0.7-1.0 based on evidence quality",
    "- Tag with relevant books from the doctrinal library",
    "- Categorize by justice tier and harm type when applicable",
    "- Flag contradictions if findings conflict with existing doctrine",
    "- Propose concrete updates when doctrine needs revision"
  ].join("\n");
}

function generateEnhancedMockData(agent: string): any {
  const baseDate = dayjs().subtract(Math.floor(Math.random() * 30), 'days').format('YYYY-MM-DD');
  
  const agentData: Record<string, any> = {
    "AEGIS": {
      items: [
        {
          agent: "AEGIS",
          summary: "Comprehensive audit of pretrial risk assessment tools reveals 18% racial disparity in high-risk classifications across 15 jurisdictions",
          insights: [
            "Black defendants 1.8x more likely to be classified as high-risk despite similar offense profiles",
            "Socioeconomic factors account for 40% of algorithmic bias",
            "Jurisdictions using human oversight showed 12% reduction in disparities"
          ],
          region: "US-National",
          date: baseDate,
          source: "Partnership for Safety & Justice, Algorithmic Accountability Report 2025, doi:10.15555/psj-2025-audit",
          book_ref: ["Book I", "Book X"],
          justice_tier: "high",
          harm_type: "white_collar",
          confidence: 0.89
        },
        {
          agent: "AEGIS", 
          summary: "European Union's AI Act compliance audit of justice systems identifies key fairness requirements for automated decision-making",
          insights: [
            "Mandatory human review for high-stakes decisions",
            "Explainability requirements for algorithmic recommendations",
            "Regular bias testing with demographic parity metrics"
          ],
          region: "EU-Wide",
          date: dayjs(baseDate).subtract(5, 'days').format('YYYY-MM-DD'),
          source: "EU Agency for Fundamental Rights, AI Justice Systems Report 2025, fra.europa.eu/ai-justice-2025",
          book_ref: ["Book I", "Book XIII"],
          justice_tier: "medium",
          harm_type: "digital",
          confidence: 0.92
        }
      ]
    },
    "KAIROS": {
      items: [
        {
          agent: "KAIROS",
          summary: "Trauma-informed pacing protocol reduces victim re-traumatization by 45% in sexual violence restorative conferences",
          insights: [
            "Three-stage consent verification process enables victim agency",
            "Average 6-week preparation period optimal for readiness",
            "Cultural adaptation crucial for Indigenous and immigrant communities"
          ],
          region: "CA-BC",
          date: baseDate,
          source: "BC Restorative Justice Association, Trauma-Informed Practice Report 2025, bcrestorative.ca/trauma-study",
          book_ref: ["Book II", "Book IV"],
          justice_tier: "high",
          harm_type: "sexual",
          confidence: 0.87
        }
      ]
    },
    "LYRA": {
      items: [
        {
          agent: "LYRA",
          summary: "Narrative repair techniques in Indigenous justice circles show 82% satisfaction rate for addressing historical trauma",
          insights: [
            "Storytelling integration allows victims to reclaim agency",
            "Community witnessing provides validation and support",
            "Intergenerational healing addresses systemic impacts"
          ],
          region: "CA-Indigenous",
          date: baseDate,
          source: "First Nations Justice Council, Narrative Healing Report 2025, fnjc.ca/narrative-healing-2025",
          book_ref: ["Book I", "Book XVII"],
          justice_tier: "medium",
          harm_type: "symbolic",
          confidence: 0.84
        }
      ]
    },
    "SENTINEL": {
      items: [
        {
          agent: "SENTINEL",
          summary: "System integrity scan reveals anomalous patterns in case processing delays correlating with agent coordination failures",
          insights: [
            "16% increase in processing time during peak contradiction periods",
            "Memory write failures occurring in 3% of high-complexity cases",
            "Agent behavior anomalies cluster around doctrinal boundary conditions"
          ],
          region: "System-Internal",
          date: baseDate,
          source: "Veritas.O System Logs, Integrity Monitor v2.1, internal://system-health-2025-08",
          book_ref: ["Book VII", "Book IX"],
          justice_tier: "medium",
          harm_type: "digital",
          confidence: 0.91
        },
        {
          agent: "SENTINEL",
          summary: "Narrative freeze detection algorithm identifies early warning patterns in 74% of stalled restorative processes",
          insights: [
            "Grief avoidance loops preceded by 3+ circular dialogue patterns",
            "Participant engagement metrics drop 40% before narrative freeze",
            "Early intervention protocols can restore flow in 68% of cases"
          ],
          region: "System-Analysis",
          date: dayjs(baseDate).subtract(2, 'days').format('YYYY-MM-DD'),
          source: "Veritas.O Behavioral Analytics, Pattern Recognition Module v3.2, internal://narrative-analysis-2025",
          book_ref: ["Book II", "Book VII"],
          justice_tier: "low",
          harm_type: "digital",
          confidence: 0.88
        }
      ]
    },
    "MIRRA": {
      items: [
        {
          agent: "MIRRA",
          summary: "Contradiction analysis reveals tension between KAIROS timing protocols and LYRA narrative pacing in complex trauma cases",
          insights: [
            "Temporal precision conflicts with narrative emergence needs",
            "Victim readiness indicators vary between timing and narrative frameworks", 
            "Integration approach needed for cases involving multiple trauma types"
          ],
          region: "Doctrinal-Analysis",
          date: baseDate,
          source: "Veritas.O Doctrinal Review, Contradiction Monitor v4.1, internal://doctrine-scan-2025-08",
          book_ref: ["Book XII", "Book II"],
          justice_tier: "medium",
          harm_type: "symbolic",
          confidence: 0.86
        }
      ],
      contradictions: [
        {
          id: `mirra-${Date.now()}-001`,
          description: "KAIROS grief pacing protocols specify 2-week minimum intervals while LYRA narrative repair suggests organic timing based on story readiness",
          severity: 3,
          proposals: [
            "Create hybrid timing-narrative framework allowing story-driven pacing within trauma-safe intervals",
            "Establish LYRA priority for narrative-intensive cases with KAIROS safety oversight",
            "Develop case-specific negotiation protocol between temporal and narrative agents"
          ]
        }
      ]
    },
    "JUNO": {
      items: [
        {
          agent: "JUNO",
          summary: "Doctrinal synthesis identifies need for digital mediation protocols in Books II and VI to address post-pandemic justice delivery",
          insights: [
            "67% of restorative processes now include digital components",
            "Cultural adaptation frameworks need expansion for virtual sacred spaces",
            "Consent verification protocols require enhancement for online environments"
          ],
          region: "Doctrinal-Global",
          date: baseDate,
          source: "Veritas.O Chief Arbiter Review, Doctrine Synthesis v5.0, internal://doctrine-evolution-2025-08",
          book_ref: ["Book I", "Book XIII"],
          justice_tier: "high",
          harm_type: "digital",
          confidence: 0.93
        }
      ],
      doctrine_updates: [
        {
          id: `juno-${Date.now()}-001`,
          book: "Book II: Gentle De-escalation",
          change: "Added Chapter 7: Digital Mediation Protocols with cultural sensitivity requirements and virtual consent verification procedures",
          rationale: "Growing prevalence of digital justice processes requires explicit guidance for maintaining de-escalation principles in virtual environments"
        },
        {
          id: `juno-${Date.now()}-002`,
          book: "Book VI: Sovereignty", 
          change: "Enhanced Section 3: Digital Sovereignty to include virtual sacred space protections and online cultural adaptation safeguards",
          rationale: "Digital environments require specific protections for cultural practices and sacred elements in virtual restorative processes"
        }
      ]
    }
  };
  
  return agentData[agent] || { items: [] };
}

async function runGrowthCycle(): Promise<void> {
  console.log("[Growth Engine] Starting enhanced growth cycle");
  
  const spec = readSpec();
  const timestamp = dayjs().format("YYYY-MM-DD_HH-mm-ss");
  const cycleDate = dayjs().format("YYYY-MM-DD");
  
  ensureDir(OUT_DIR);
  ensureDir(path.dirname(PORTAL_FEED));
  
  const allItems: GrowthItem[] = [];
  const allContradictions: Contradiction[] = [];
  const allDoctrineUpdates: DoctrineUpdate[] = [];
  
  const systemPrompt = buildSystemPrompt();
  
  // Process each agent domain
  for (const domain of spec.domains) {
    const queries = spec.queries[domain] || [];
    if (queries.length === 0) continue;
    
    console.log(`[Growth Engine] Processing ${domain} with ${queries.length} queries`);
    
    try {
      const userPrompt = buildUserPrompt(domain, queries, spec.tagging_schema);
      const response = await askGPT(systemPrompt, userPrompt);
      
      const parsed = JSON.parse(response);
      
      // Process items with enhanced validation
      if (parsed.items && Array.isArray(parsed.items)) {
        for (const item of parsed.items) {
          const enhancedItem: GrowthItem = {
            agent: domain,
            summary: item.summary || "No summary provided",
            insights: item.insights || [],
            region: item.region,
            date: item.date,
            source: item.source,
            book_ref: item.book_ref || spec.tagging_schema.books_map[domain] || [],
            justice_tier: item.justice_tier,
            harm_type: item.harm_type,
            confidence: item.confidence || spec.tagging_schema.defaults.confidence
          };
          
          // Apply enhanced thresholds
          if (spec.thresholds.require_source && !enhancedItem.source) {
            console.warn(`[Growth Engine] Skipping item without source: ${enhancedItem.summary}`);
            continue;
          }
          
          if (enhancedItem.confidence && enhancedItem.confidence < spec.thresholds.min_confidence) {
            console.warn(`[Growth Engine] Skipping low-confidence item: ${enhancedItem.summary}`);
            continue;
          }
          
          allItems.push(enhancedItem);
        }
      }
      
      // Process contradictions with enhanced structure
      if (parsed.contradictions && Array.isArray(parsed.contradictions)) {
        for (const contradiction of parsed.contradictions) {
          const enhancedContradiction: Contradiction = {
            id: contradiction.id || `${domain.toLowerCase()}-${Date.now()}`,
            description: contradiction.description,
            severity: contradiction.severity || 1,
            proposals: contradiction.proposals || [],
            agents_involved: contradiction.agents_involved || [domain]
          };
          allContradictions.push(enhancedContradiction);
        }
      }
      
      // Process doctrine updates with source tracking
      if (parsed.doctrine_updates && Array.isArray(parsed.doctrine_updates)) {
        for (const update of parsed.doctrine_updates) {
          const enhancedUpdate: DoctrineUpdate = {
            id: update.id || `${domain.toLowerCase()}-${Date.now()}`,
            book: update.book,
            change: update.change,
            rationale: update.rationale,
            agent_source: domain
          };
          allDoctrineUpdates.push(enhancedUpdate);
        }
      }
      
    } catch (error) {
      console.error(`[Growth Engine] Error processing ${domain}:`, error);
      // Add error item for tracking
      allItems.push({
        agent: domain,
        summary: `Processing error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        region: "System-Error",
        date: cycleDate,
        source: "internal://error-log",
        confidence: 0.0
      });
    }
  }
  
  // Generate comprehensive growth feed
  const growthFeed = {
    version: spec.version,
    cycle_date: cycleDate,
    generated_at: new Date().toISOString(),
    items_count: allItems.length,
    items: allItems,
    contradictions: allContradictions,
    doctrine_updates: allDoctrineUpdates,
    metadata: {
      agents_processed: spec.domains,
      total_queries: Object.values(spec.queries).flat().length,
      thresholds_applied: spec.thresholds,
      processing_summary: {
        successful_agents: spec.domains.length - spec.domains.filter((d: string) => 
          allItems.some(i => i.agent === d && i.summary.includes('Processing error'))
        ).length,
        total_insights: allItems.reduce((sum, item) => sum + (item.insights?.length || 0), 0),
        quality_score: allItems.length > 0 
          ? allItems.reduce((sum, item) => sum + (item.confidence || 0), 0) / allItems.length 
          : 0
      }
    }
  };
  
  // Save to portal feed
  fs.writeFileSync(PORTAL_FEED, JSON.stringify(growthFeed, null, 2));
  
  // Save detailed log with enhanced naming
  const logFile = path.join(OUT_DIR, `growth-cycle-${timestamp}.json`);
  fs.writeFileSync(logFile, JSON.stringify(growthFeed, null, 2));
  
  // Save daily summary for quick access
  const dailySummary = path.join(OUT_DIR, `${cycleDate}.json`);
  fs.writeFileSync(dailySummary, JSON.stringify(growthFeed, null, 2));
  
  console.log(`[Growth Engine] Enhanced cycle completed:`);
  console.log(`  - Items collected: ${allItems.length}`);
  console.log(`  - Total insights: ${growthFeed.metadata.processing_summary.total_insights}`);
  console.log(`  - Contradictions found: ${allContradictions.length}`);
  console.log(`  - Doctrine updates: ${allDoctrineUpdates.length}`);
  console.log(`  - Quality score: ${growthFeed.metadata.processing_summary.quality_score.toFixed(3)}`);
  console.log(`  - Portal feed: ${PORTAL_FEED}`);
  console.log(`  - Detailed log: ${logFile}`);
}

// Run if called directly
if (require.main === module) {
  runGrowthCycle()
    .then(() => {
      console.log("[Growth Engine] Enhanced growth cycle completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("[Growth Engine] Enhanced growth cycle failed:", error);
      process.exit(1);
    });
}

export { runGrowthCycle };
