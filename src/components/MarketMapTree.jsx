function MarketMapTree({ subsectors, onSelectSubsector }) {
  return (
    <section className="subsector-section-grid" aria-label="Subsectors in this layer">
      <div className="subsector-grid">
        {subsectors.map((subsector, index) => {
          return (
            <button
              className="subsector-card"
              key={subsector.name}
              type="button"
              onClick={() => onSelectSubsector(subsector)}
            >
              <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="card-name">{subsector.name}</span>
              <span className="card-arrow" aria-hidden="true">-&gt;</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default MarketMapTree