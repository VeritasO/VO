# 🌱 Veritas.O Growth Engine v7.0

## Overview

The Veritas.O Growth Engine is an automated knowledge acquisition and integration system that operates under the Doctrine of Meaningful Thought. It systematically gathers insights across all agent domains, detects contradictions, and evolves the doctrinal library through continuous learning cycles.

## 🎯 Core Features

### **Automated Knowledge Acquisition**
- **9 Agent Domains**: AEGIS, KAIROS, LYRA, ORION, THALEA, VESTA, MIRRA, JUNO, SENTINEL
- **Configurable Queries**: Each agent has specialized research queries for their domain
- **Quality Validation**: Confidence scoring and source verification
- **Multi-tier Analysis**: Low, Medium, High, Extreme justice tier classification

### **Contradiction Detection (MIRRA)**
- **Doctrinal Tension Analysis**: Identifies conflicts between new findings and existing doctrine
- **Severity Classification**: 1-5 scale with automated escalation
- **Resolution Proposals**: MIRRA suggests 2-3 resolution options for each contradiction
- **Agent Coordination**: Tracks which agents are involved in each conflict

### **Doctrine Evolution (JUNO)**
- **Synthesis Integration**: JUNO reviews all findings for doctrinal consistency
- **Amendment Proposals**: Concrete updates to Books I-XXVII
- **Practice Templates**: Actionable guidance for implementation
- **Proportionality Analysis**: Risk assessment and safeguards

### **System Surveillance (SENTINEL)**
- **Integrity Monitoring**: Continuous system health and anomaly detection
- **Narrative Freeze Detection**: Early warning for stalled processes
- **Agent Behavior Analysis**: Performance monitoring and coordination issues
- **Data Quality Assurance**: Corruption detection and validation

## 📁 File Structure

```
backend/src/
├── config/
│   ├── growth_engine.json      # Main configuration
│   └── growth_state.json       # Runtime state
├── jobs/
│   ├── scheduler.ts            # Cron scheduling
│   ├── runGrowthEngine.ts      # Core processing
│   └── openaiClient.ts         # OpenAI integration
├── routes/
│   └── growth.ts               # REST API endpoints
└── data/
    └── growth_logs/            # Generated cycle data

frontend/src/
├── lib/
│   └── growth.ts               # API client
├── components/
│   ├── GrowthNowButton.tsx     # Manual trigger
│   └── GrowthAdmin.tsx         # Admin interface
└── public/
    ├── dashboard.html          # Interactive dashboard
    └── growth_feed.json        # Latest cycle output
```

## 🚀 Quick Start

### 1. Installation
```bash
# Run the setup script
./setup.sh

# Or manually:
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configuration
```bash
# Add your OpenAI API key to .env
echo "OPENAI_API_KEY=your_key_here" >> .env
echo "PORT=4000" >> .env
```

### 3. Start the System
```bash
cd backend && npm run dev
```

### 4. Access the Dashboard
Open: `http://localhost:4000/dashboard.html`

## 🎛️ Operation Modes

### **Standard Mode (Default)**
- **Schedule**: Every Monday at 9:00 AM
- **Use Case**: Regular knowledge acquisition and system maintenance
- **Agents Processed**: All 9 domains

### **High Growth Mode**
- **Schedule**: Monday + Thursday at 9:00 AM
- **Use Case**: Periods of rapid system evolution or high case volume
- **Enhanced Processing**: More frequent contradiction detection

### **Emergency Mode**
- **Schedule**: Manual runs only
- **Use Case**: System issues or critical contradiction resolution
- **On-Demand**: Immediate processing when needed

## 📊 Dashboard Features

### **Interactive Tabs**
- **Overview**: KPIs, recent items, system signals
- **Growth Items**: Searchable/filterable feed with confidence scoring
- **Contradictions**: MIRRA-detected conflicts with resolution voting
- **Doctrine Updates**: JUNO-approved changes to the library
- **Agents**: Network status with performance monitoring
- **Settings**: Configuration and system management

### **Advanced UI**
- **Command Palette**: ⌘K for quick navigation
- **Real-time Filters**: Agent, tier, region, confidence level
- **Confidence Visualization**: Progress bars showing evidence quality
- **Toast Notifications**: System feedback and status updates

## 🔧 API Endpoints

### Growth Engine Control
```bash
# Get current state
GET /api/growth/state

# Change operational mode
POST /api/growth/mode
{ "mode": "standard|high_growth|emergency" }

# Manual cycle trigger
POST /api/growth/run

# View cycle logs
GET /api/growth/logs
GET /api/growth/logs/:filename
```

### Data Access
```bash
# Latest growth feed
GET /growth_feed.json

# System health
GET /api/health
```

## 📝 Configuration Reference

### `growth_engine.json`
```json
{
  "domains": ["AEGIS", "KAIROS", "LYRA", "ORION", "THALEA", "VESTA", "MIRRA", "JUNO", "SENTINEL"],
  "queries": {
    "AEGIS": ["Bias detection queries..."],
    "SENTINEL": ["System monitoring queries..."]
  },
  "tagging_schema": {
    "fields": ["agent", "book_ref", "justice_tier", "harm_type", "region", "source", "date", "confidence"],
    "books_map": {
      "SENTINEL": ["Book VII", "Book IX"]
    }
  },
  "thresholds": {
    "min_confidence": 0.7,
    "require_source": true
  }
}
```

## 🤖 OpenAI Integration

### Activation
1. Uncomment OpenAI imports in `runGrowthEngine.ts`
2. Replace mock `askGPT` with `askGPTReal`
3. Configure model preferences in `openaiClient.ts`

### Model Recommendations
- **Research Tasks**: `gpt-4o` for complex analysis
- **Synthesis**: `gpt-4o-mini` for summarization
- **Fast Processing**: `gpt-3.5-turbo` for simple queries

### Temperature Settings
- **Analytical Agents** (AEGIS, SENTINEL): 0.1
- **Creative Agents** (LYRA, VESTA): 0.3
- **Balanced Agents** (JUNO, MIRRA): 0.2

## 🔍 System Monitoring

### Health Indicators
- **Processing Success Rate**: % of successful agent queries
- **Quality Score**: Average confidence across all items
- **Contradiction Rate**: Rate of doctrinal conflicts detected
- **System Integrity**: SENTINEL health assessments

### Performance Metrics
- **Cycle Duration**: Time to complete full processing
- **API Response Times**: Growth engine endpoint performance
- **Memory Usage**: System resource consumption
- **Error Rates**: Failed processing attempts

## 🛡️ Safety & Governance

### Data Quality
- **Source Verification**: All items require credible citations
- **Confidence Scoring**: 0.7+ threshold for inclusion
- **Duplicate Detection**: Cross-agent consistency checking
- **Cultural Sensitivity**: Adaptation warnings and safeguards

### Doctrinal Integrity
- **JUNO Oversight**: All doctrine changes require Chief Arbiter approval
- **Contradiction Resolution**: MIRRA mediates conflicts before integration
- **Version Control**: Full audit trail of doctrinal evolution
- **Rollback Capability**: Revert problematic changes if needed

### Privacy & Security
- **No Personal Data**: Focus on aggregate patterns and public research
- **Anonymized Sources**: Individual case details are protected
- **Secure Storage**: Encrypted logs and configuration
- **Access Control**: Admin-only system configuration

## 🎭 Agent Specializations

### **SENTINEL Integration**
SENTINEL provides unique system surveillance capabilities:

- **Anomaly Detection**: Identifies unusual patterns in agent behavior
- **Integrity Monitoring**: Scans for data corruption and system health
- **Narrative Freeze Detection**: Early warning for stalled processes
- **Performance Analysis**: Monitors response times and coordination

**SENTINEL Queries**:
1. System integrity monitoring across all domains
2. Narrative freeze and grief avoidance loop detection  
3. Agent behavior anomaly identification

**Books Referenced**: Book VII (Agent Systems), Book IX (System Protocols)

## 📈 Growth Analytics

### Cycle Metrics
- **Items per Cycle**: Target 15-25 validated items
- **Agent Participation**: 100% domain coverage expected
- **Quality Distribution**: Confidence score analysis
- **Source Diversity**: Geographic and institutional variety

### Trend Analysis
- **Doctrinal Evolution Rate**: Changes per cycle
- **Contradiction Patterns**: Common conflict themes
- **Agent Coordination**: Cross-domain collaboration
- **System Health Trends**: SENTINEL monitoring results

## 🔮 Future Enhancements

### Planned Features
- **Machine Learning Integration**: Pattern recognition in contradictions
- **Real-time Processing**: Event-driven rather than scheduled
- **External API Integration**: Direct research database access
- **Predictive Analysis**: Anticipate system needs and contradictions

### Scalability
- **Distributed Processing**: Multi-node deployment
- **Agent Specialization**: Dynamic query generation
- **Custom Domains**: User-defined agent areas
- **Multi-language Support**: Global knowledge integration

---

**Built with the Doctrine of Meaningful Thought**  
*Truth through reflection, justice through restoration, wisdom through contradiction*

For support or questions, see the main Veritas.O documentation or check the system logs in `/backend/src/data/growth_logs/`.
