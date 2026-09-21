import { useNavigate } from 'react-router-dom'

function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`))
}

function SubsectorDetail({ subsector, layer }) {
  const navigate = useNavigate()
  const fundingRounds = [...subsector.fundingRounds].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <main className="subsector-page">
      <header className="subsector-header">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Market Map</a>
          <span className="breadcrumb-separator" aria-hidden="true">&gt;</span>
          <a href={`/#${layer.slug}`}>{layer.name}</a>
          <span className="breadcrumb-separator" aria-hidden="true">&gt;</span>
          <span aria-current="page">{subsector.name}</span>
        </nav>
        <button className="back-button" type="button" onClick={() => navigate('/')}>
          <span aria-hidden="true">&lt;-</span> Back to Market Map
        </button>
        <p className="eyebrow">Subsector profile</p>
        <h1>{subsector.name}</h1>
      </header>

      <section className="subsector-section" aria-labelledby="companies-heading">
        <div className="section-heading">
          <p className="eyebrow">01</p>
          <h2 id="companies-heading">Companies</h2>
        </div>
        <div className="company-cards">
          {subsector.companies.map((company) => (
            <article className="company-card" key={company.name}>
              <h3>{company.name}</h3>
              <p>{company.description}</p>
              {company.stage && (
                <div className="company-meta">
                  <span>{company.stage}</span>
                  <span>{company.amount}</span>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="subsector-section" aria-labelledby="funding-heading">
        <div className="section-heading">
          <p className="eyebrow">02</p>
          <h2 id="funding-heading">Recent funding</h2>
        </div>
        {fundingRounds.length > 0 ? (
          <div className="funding-list">
            {fundingRounds.map((round) => (
              <div className="funding-row" key={`${round.company}-${round.date}`}>
                <strong>{round.company}</strong>
                <span>{round.amount}</span>
                <span>{round.stage}</span>
                <time dateTime={round.date}>{formatDate(round.date)}</time>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">Funding round data will be added soon.</p>
        )}
      </section>

      <section className="subsector-section trend-section" aria-labelledby="trends-heading">
        <div className="section-heading">
          <p className="eyebrow">03</p>
          <h2 id="trends-heading">Trends</h2>
        </div>
        <p className="trend-copy">{subsector.trend}</p>
      </section>
    </main>
  )
}

export default SubsectorDetail