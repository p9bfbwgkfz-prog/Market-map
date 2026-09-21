function LayerStack({ layers, onSelectLayer }) {
  return (
    <section className="layer-stack" aria-label="Enterprise AI and software layers">
      <div className="stack-spine" aria-hidden="true" />
      {layers.map((layer, index) => (
        <button
          className={`layer-band layer-band-${index + 1}`}
          key={layer.slug}
          type="button"
          onClick={() => onSelectLayer(layer)}
        >
          <span className="layer-number">{String(index + 1).padStart(2, '0')}</span>
          <span className="layer-copy">
            <strong>{layer.name}</strong>
            <span>{layer.description}</span>
          </span>
          <span className="layer-arrow" aria-hidden="true">-&gt;</span>
        </button>
      ))}
    </section>
  )
}

export default LayerStack