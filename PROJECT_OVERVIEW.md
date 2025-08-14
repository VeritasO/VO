# VeritasO Project Structure

## 📁 Directory Overview

```
VO/
├── src/
│   ├── agents/                 # Agent implementations
│   │   ├── registry.ts         # Central agent registry
│   │   ├── A1_JUNO.ts         # Chief Arbiter
│   │   ├── A2_AEGIS.ts        # Bias Detection & Fairness Audit
│   │   ├── A3_KAIROS.ts       # Temporal Logic & Timing
│   │   ├── A4_LYRA.ts         # Emotional Sovereignty & Expression
│   │   ├── A5_ORION.ts        # Strategic Navigation & Coordination
│   │   ├── A6_SOPHIA.ts       # Knowledge & Wisdom Integration
│   │   ├── A7_PHOENIX.ts      # Transformation & Renewal
│   │   ├── A8_ATLAS.ts        # Infrastructure & Support Systems
│   │   ├── A9_IRIS.ts         # Communication & Bridge Building
│   │   ├── A10_MIRRA.ts       # Contradiction & Reflection
│   │   ├── A11_ANIMA.ts       # Emotional Intelligence & Empathy
│   │   ├── A12_POLYMNIA.ts    # Creative Problem Solving
│   │   ├── A13_CHORUS.ts      # Collective Decision Making
│   │   ├── A14_SOVRIN.ts      # Ethical Governance
│   │   ├── A15_LIRA.ts        # Linguistic Analysis
│   │   ├── A16_OPHIRA.ts      # Predictive Analytics
│   │   ├── A17_MASKARA.ts     # Identity Protection
│   │   ├── A18_ASTRAEA.ts     # Justice Enforcement
│   │   ├── A19_COSMA.ts       # Cosmic Perspective
│   │   ├── A20_SERENA.ts      # Peacekeeping
│   │   └── A21_TEMPER.ts      # Conflict Mediation
│   ├── cases/                  # Case processing engine
│   │   ├── Case.ts            # Core case types and interfaces
│   │   ├── processor.ts       # Case processing logic
│   │   └── contradictionUtils.ts # Contradiction detection utilities
│   ├── components/             # React frontend components
│   │   ├── App.tsx            # Main application component
│   │   ├── AgentDashboard.tsx # Agent status dashboard
│   │   ├── BookLibrary.tsx    # Doctrinal library interface
│   │   └── SystemDashboard.tsx # System metrics dashboard
│   ├── doctrine/               # Doctrinal library system
│   │   ├── Book.ts            # Book and library interfaces
│   │   └── library.ts         # Doctrine implementation and versioning
│   ├── memory/                 # Memory and logging system
│   │   └── OmniMemory.ts      # Immutable memory implementation
│   ├── metrics/                # System health and justice metrics
│   │   └── metrics.ts         # Metric calculation logic
│   ├── protocols/              # System protocols and policies
│   │   └── protocols.ts       # Protocol definitions
│   ├── system/                 # Main system orchestration
│   │   └── main.ts            # System entry point and demo
│   └── types/                  # Core type definitions
│       └── Agent.ts           # Agent interface and types
├── __tests__/                  # Test suite
│   ├── agents.test.ts         # Agent system tests
│   └── doctrine.test.ts       # Doctrine system tests
├── dist/                       # Compiled JavaScript output
├── node_modules/               # Dependencies
├── coverage/                   # Test coverage reports
├── package.json               # Project configuration
├── tsconfig.json              # TypeScript configuration
├── jest.config.js             # Test configuration
└── README.md                  # Documentation
```

## 🎯 Key Features Implemented
- **Multi-Agent Architecture**: 21 specialized agents with unique roles and capabilities
- **Doctrinal Reflection**: Living doctrine that evolves through contradiction resolution
- **Case Processing**: Complete tribunal engine with contradiction detection
- **Memory System**: Immutable logging with specialized contradiction tracking
- **Metrics**: Justice indices tracking system health and performance
- **Protocols**: Comprehensive policy framework

## 🚀 System Architecture
Veritas.O is composed of modular engines and services:
1. **Agent Engine** – Multi-agent coordination hub (`src/agents`, `registry.ts`)
2. **Doctrine Engine** – Living doctrinal library with versioning (`src/doctrine`)
3. **Case & Tribunal Engine** – Case lifecycle processing and contradiction detection (`src/cases`)
4. **Memory System** – Immutable logging and snapshotting (`src/memory`)
5. **Metrics Module** – Justice indices and health monitoring (`src/metrics`)
6. **Protocols Framework** – Policy definitions and execution hooks (`src/protocols`)
7. **Frontend UI** – Dashboard, agent visualization and interactive components (`src/components`)

## 🤖 Agent Specializations
Each agent in `src/agents` implements the `Agent` interface and focuses on a core domain:
| ID    | Name      | Domain & Role                                         |
|-------|-----------|-------------------------------------------------------|
| A1    | JUNO      | Chief Arbiter: doctrine integrity & dispute resolution|
| A2    | AEGIS     | Bias Auditor: fairness checks & validation             |
| A3    | KAIROS    | Temporal Agent: timing, grief integration             |
| A4    | LYRA      | Narrative Agent: testimony & emotional sovereignty    |
| A5    | ORION     | Ontology Agent: rights & strategic navigation         |
| A6    | THALEA    | Healing Agent: land-based & ecological restoration    |
| A7    | VESTA     | Ritual Agent: symbolic ceremonies & transitions       |
| A8    | TEMPUS    | Timekeeper: timestamp integrity & reversibility       |
| A9    | SENTINEL  | Monitor Agent: anomaly detection & system immunity    |
| A10   | MIRRA     | Reflection Agent: contradiction detection & resolution|
| A11   | ANIMA     | Empathy Agent: embodied emotion & healing practices   |
| A12   | POLYMNIA  | Creative Agent: dynamic agent creation & liaison      |
| A13   | CHORUS    | Collective Agent: community input & voice synthesis   |
| A14   | SOVRIN    | Governance Agent: autonomy & ethical oversight       |
| A15   | LIRA      | Scaling Agent: justice calibration & scaling logic    |
| A16   | OPHIRA    | Foresight Agent: predictive analytics & risk modeling|
| A17   | MASKARA   | Identity Agent: role dynamics & privacy protection   |
| A18   | ASTRAEA   | Ethical Agent: cosmic & intergenerational ethics     |
| A19   | COSMA     | Harmony Agent: micro/macro coherence                 |
| A20   | SERENA    | Peace Agent: equilibrium & co-regulation             |
| A21   | TEMPER    | Mediation Agent: burnout prevention & conflict cooling|

## 📚 Doctrinal Library
The living doctrine is stored in `src/doctrine/library.ts` and comprises:
- **Book I**: The Book of Meaningful Thought (fairness logic, neuroethics)
- **Book II**: The Book of Gentle De-escalation (conflict reduction)
- **Book III**: The Book of Emotional Sovereignty (protecting emotions)
- **Book IV**: The Book of Mental Health & Grief-Integrated Justice
- **Book V**: The Book of Transformative Restoration (time-aware repair)
- **Future Books**: XIV+ expanding into emergent justice domains

## 🎨 Frontend Components
- **AgentDashboard** – Real-time status of all agents with symbols & roles
- **BookLibrary** – Interactive doctrinal interface with chapter navigation
- **SystemDashboard** – Summary cards, charts (Chart.js) and recent activity feed
- **CaseList** – Searchable, sortable table of active cases
- **WorkflowStepper** – Step-by-step simulation of case processing
- **NetworkDiagram** – SVG network visualization of agent relationships
- **Modals & Overlays** – Detail views for agents, books, and cases
- **Theme & Accessibility** – Dark/light toggle, skip links, smooth scrolling

## ⚙️ Growth Engine (v7.0)
- **Automated Knowledge Acquisition** – Periodic reflection cycles
- **Doctrine Evolution** – MIRRA-driven integration of new insights
- **Configurable Modes** – Standard, High-Growth, Emergency
- **Scheduling & Admin** – JSON-schema driven control panel

## 🧪 Testing & Quality
- **Unit Tests** – Agents and doctrine tests in `__tests__`, Jest coverage
- **Type Safety** – TypeScript definitions for agents, cases, protocols
- **CI/CD Ready** – Scripts for automated builds and linting

## 🔮 Future Enhancements
- **Complete Agent Set** – Fill out agents beyond A21 for specialized domains
- **Machine Learning** – Pattern recognition & adaptive learning loops
- **Distributed Processing** – Multi-node orchestration & load balancing
- **External Integrations** – REST/GraphQL API, web data ingestion
- **Advanced Frontend** – React/Next.js migration, real-time websockets

---

*"Truth through reflection, justice through restoration, wisdom through contradiction."*

## 📄 License
MIT License - See LICENSE file for details

---

**VeritasO v7.0.0** - Enhanced with Growth Engine automation, refined dashboard UI, and comprehensive doctrine management system.
