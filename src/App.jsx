import { useState } from 'react'
import './App.css'
import MarketMapTree from './components/MarketMapTree.jsx'

const subsectors = [
  {
    name: 'Foundation Models & LLM Infra',
    companies: ['OpenAI', 'Anthropic', 'Cohere'],
    trend: 'Model capabilities are becoming more competitive while enterprise demand shifts toward reliable, cost-efficient access.',
  },
  {
    name: 'AI Infra & MLOps',
    companies: ['Databricks', 'Weights & Biases', 'Together AI'],
    trend: 'The infrastructure layer is consolidating around platforms that make model development, deployment, and monitoring easier to operate.',
  },
  {
    name: 'AI Agents & Automation',
    companies: ['UiPath', 'Glean', 'ServiceNow'],
    trend: 'Agentic workflows are moving from demos into repeatable business processes with measurable productivity gains.',
  },
  {
    name: 'Vertical AI Apps',
    companies: ['Harvey', 'Abridge', 'Sierra'],
    trend: 'Purpose-built applications are using domain expertise and proprietary workflows to create differentiated value beyond general models.',
  },
  {
    name: 'Developer Tools & Coding',
    companies: ['GitHub Copilot', 'Cursor', 'Replit'],
    trend: 'AI coding assistants are expanding from autocomplete into end-to-end software planning, implementation, and review.',
  },
  {
    name: 'Enterprise Search & Knowledge',
    companies: ['Glean', 'Guru', 'Hebbia'],
    trend: 'Companies are replacing fragmented intranets with permission-aware answers across internal knowledge and business systems.',
  },
]

function App() {
  const [selectedSubsector, setSelectedSubsector] = useState(subsectors[0])

  return (
    <main className="market-map">
      <header className="page-header">
        <p className="eyebrow">Market landscape</p>
        <h1>Enterprise AI &amp; Software</h1>
        <p className="intro">
          Explore the major categories shaping the next generation of enterprise technology.
        </p>
      </header>

      <MarketMapTree
        subsectors={subsectors}
        selectedSubsector={selectedSubsector}
        onSelectSubsector={setSelectedSubsector}
      />

      <section className="detail-panel" aria-live="polite">
        <div className="detail-heading">
          <p className="eyebrow">Selected subsector</p>
          <h2>{selectedSubsector.name}</h2>
        </div>
        <div className="detail-content">
          <div>
            <p className="detail-label">Example companies</p>
            <ul className="company-list">
              {selectedSubsector.companies.map((company) => (
                <li key={company}>{company}</li>
              ))}
            </ul>
          </div>
          <div className="trend-note">
            <p className="detail-label">Trend note</p>
            <p>{selectedSubsector.trend}</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
