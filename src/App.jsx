import { BrowserRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import './App.css'
import MarketMapTree from './components/MarketMapTree.jsx'
import SubsectorDetail from './components/SubsectorDetail.jsx'

const layers = [
  {
    name: 'Applications',
    slug: 'applications',
    description: 'End-user products that bring AI into everyday business workflows.',
  },
  {
    name: 'Developer & Agent Platforms',
    slug: 'developer-agent-platforms',
    description: 'Tools and systems for building, orchestrating, and operating AI software.',
  },
  {
    name: 'Middleware & Governance',
    slug: 'middleware-governance',
    description: 'The control, reliability, and policy layer between models and products.',
  },
  {
    name: 'Infrastructure',
    slug: 'infrastructure',
    description: 'Models, data, and compute that power the rest of the stack.',
  },
]

const subsectors = [
  {
    name: 'Foundation Models & LLM Infra',
    slug: 'foundation-models-llm-infra',
    layer: 'infrastructure',
    companies: [
      { name: 'OpenAI', description: 'Frontier models and developer APIs for general-purpose intelligence.', stage: 'Late stage', amount: '$6.6B raised' },
      { name: 'Anthropic', description: 'AI safety company building reliable Claude foundation models.', stage: 'Late stage', amount: '$7.3B raised' },
      { name: 'Cohere', description: 'Enterprise language models and retrieval tools for private data.', stage: 'Series F', amount: '$970M raised' },
      { name: 'Mistral AI', description: 'Open and commercial foundation models built in Europe.', stage: 'Series B', amount: '$640M raised' },
    ],
    fundingRounds: [
      { company: 'OpenAI', amount: '$6.6B', stage: 'Venture round', date: '2024-10-02' },
      { company: 'Anthropic', amount: '$4B', stage: 'Strategic investment', date: '2024-11-22' },
      { company: 'Mistral AI', amount: '$600M', stage: 'Series B', date: '2024-06-11' },
      { company: 'Cohere', amount: '$270M', stage: 'Series F', date: '2024-07-22' },
    ],
    trend: 'Model capabilities are becoming more competitive while enterprise demand shifts toward reliable, cost-efficient access.',
  },
  {
    name: 'AI Infra & MLOps',
    slug: 'ai-infra-mlops',
    layer: 'middleware-governance',
    companies: [{ name: 'Databricks', description: 'Data and AI platform for building and deploying models.' }],
    fundingRounds: [],
    trend: 'The infrastructure layer is consolidating around platforms that make model development, deployment, and monitoring easier to operate.',
  },
  {
    name: 'AI Agents & Automation',
    slug: 'ai-agents-automation',
    layer: 'developer-agent-platforms',
    companies: [
      { name: 'UiPath', description: 'Automation platform combining software robots with AI agents.', stage: 'Public', amount: '$1.2B raised' },
      { name: 'Glean', description: 'Workplace search and assistant that connects enterprise knowledge.', stage: 'Series F', amount: '$760M raised' },
      { name: 'Sierra', description: 'Conversational AI agents for customer service and support operations.', stage: 'Series B', amount: '$175M raised' },
      { name: 'Cognition', description: 'Agentic software engineering tools for planning and shipping code.', stage: 'Series C', amount: '$400M raised' },
    ],
    fundingRounds: [
      { company: 'Glean', amount: '$260M', stage: 'Series F', date: '2025-01-14' },
      { company: 'Sierra', amount: '$110M', stage: 'Series B', date: '2025-02-19' },
      { company: 'Cognition', amount: '$175M', stage: 'Series C', date: '2025-04-08' },
      { company: 'UiPath', amount: '$750M', stage: 'Series F', date: '2018-09-18' },
    ],
    trend: 'Agentic workflows are moving from demos into repeatable business processes with measurable productivity gains.',
  },
  {
    name: 'Vertical AI Apps',
    slug: 'vertical-ai-apps',
    layer: 'applications',
    companies: [{ name: 'Harvey', description: 'AI platform for legal professionals.' }],
    fundingRounds: [],
    trend: 'Purpose-built applications are using domain expertise and proprietary workflows to create differentiated value beyond general models.',
  },
  {
    name: 'Developer Tools & Coding',
    slug: 'developer-tools-coding',
    layer: 'developer-agent-platforms',
    companies: [{ name: 'Cursor', description: 'AI-first code editor for software teams.' }],
    fundingRounds: [],
    trend: 'AI coding assistants are expanding from autocomplete into end-to-end software planning, implementation, and review.',
  },
  {
    name: 'Enterprise Search & Knowledge',
    slug: 'enterprise-search-knowledge',
    layer: 'applications',
    companies: [{ name: 'Glean', description: 'Permission-aware enterprise search and knowledge assistant.' }],
    fundingRounds: [],
    trend: 'Companies are replacing fragmented intranets with permission-aware answers across internal knowledge and business systems.',
  },
  {
    name: 'Horizontal Enterprise AI Apps',
    slug: 'horizontal-enterprise-ai-apps',
    layer: 'applications',
    companies: [{ name: 'Placeholder Co.', description: 'Sample horizontal AI application for common enterprise workflows.' }],
    fundingRounds: [],
    trend: 'General-purpose enterprise applications are embedding AI into the workflows shared across industries.',
  },
  {
    name: 'Security & Governance',
    slug: 'security-governance',
    layer: 'middleware-governance',
    companies: [{ name: 'Placeholder Security', description: 'Sample platform for securing and governing enterprise AI use.' }],
    fundingRounds: [],
    trend: 'Organizations are building controls for model risk, access, privacy, and responsible deployment.',
  },
  {
    name: 'Data Infrastructure',
    slug: 'data-infrastructure',
    layer: 'infrastructure',
    companies: [{ name: 'Placeholder Data', description: 'Sample data platform supporting AI-ready enterprise information.' }],
    fundingRounds: [],
    trend: 'AI adoption depends on reliable data foundations that make enterprise information usable and governed.',
  },
  {
    name: 'Core Enterprise SaaS',
    slug: 'core-enterprise-saas',
    layer: 'applications',
    companies: [{ name: 'Placeholder SaaS', description: 'Sample core business software with AI-native workflows.' }],
    fundingRounds: [],
    trend: 'Core systems of record are becoming intelligent surfaces for action, analysis, and automation.',
  },
]

function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span className="breadcrumb-item" key={item.label}>
          {index > 0 && <span className="breadcrumb-separator" aria-hidden="true">&gt;</span>}
          {item.to ? <a href={item.to}>{item.label}</a> : <span aria-current="page">{item.label}</span>}
        </span>
      ))}
    </nav>
  )
}

function MarketMapPage() {
  const navigate = useNavigate()

  return (
    <main className="market-map">
      <header className="page-header">
        <p className="eyebrow">Market landscape</p>
        <h1>Enterprise AI &amp; Software</h1>
        <p className="intro">
          Explore the major categories shaping the next generation of enterprise technology.
        </p>
      </header>

      <nav className="layer-nav" aria-label="Jump to market layer">
        {layers.map((layer) => (
          <a href={`#${layer.slug}`} key={layer.slug}>
            {layer.name}
          </a>
        ))}
      </nav>

      <div className="layer-bands">
        {layers.map((layer, index) => (
          <section
            className={`layer-band layer-band-${index + 1}`}
            id={layer.slug}
            key={layer.slug}
            aria-labelledby={`${layer.slug}-heading`}
          >
            <header className="layer-band-header">
              <div>
                <p className="eyebrow">Market layer</p>
                <h2 id={`${layer.slug}-heading`}>{layer.name}</h2>
              </div>
              <p>{layer.description}</p>
            </header>
            <MarketMapTree
              subsectors={subsectors.filter((subsector) => subsector.layer === layer.slug)}
              onSelectSubsector={(subsector) => navigate(`/subsector/${subsector.slug}`)}
            />
          </section>
        ))}
      </div>
    </main>
  )
}

function SubsectorRoute() {
  const { subsectorSlug } = useParams()
  const subsector = subsectors.find((item) => item.slug === subsectorSlug)

  if (!subsector) {
    return <MarketMapPage />
  }

  const layer = layers.find((item) => item.slug === subsector.layer)

  return <SubsectorDetail subsector={subsector} layer={layer} />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MarketMapPage />} />
        <Route path="/subsector/:subsectorSlug" element={<SubsectorRoute />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
