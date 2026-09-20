function MarketMapTree({ subsectors, selectedSubsector, onSelectSubsector }) {
  return (
    <section className="tree" aria-label="Enterprise AI and software market map">
      <div className="root-node">
        <span className="node-kicker">Market map</span>
        <strong>Enterprise AI &amp; Software</strong>
      </div>

      <div className="trunk" aria-hidden="true" />

      <div className="subsector-grid">
        {subsectors.map((subsector, index) => {
          const isSelected = selectedSubsector.name === subsector.name

          return (
            <button
              className={`subsector-card ${isSelected ? 'is-selected' : ''}`}
              key={subsector.name}
              type="button"
              onClick={() => onSelectSubsector(subsector)}
              aria-pressed={isSelected}
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