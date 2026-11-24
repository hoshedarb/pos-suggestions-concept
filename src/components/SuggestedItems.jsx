import Icon from './Icon.jsx'
import ProductThumb from './ProductThumb.jsx'
import { money } from '../format.js'
import './SuggestedItems.css'

// "Before" behaviour: once the order has a product, always suggest the
// single most expensive phone in the catalog. No reason, no dismiss.
function SuggestedItems({ products, lines, customer, onAdd }) {
  if (lines.length === 0) return null

  const phones = products.filter((p) => p.category === 'device')
  const suggestion = phones.reduce((best, p) => (p.price > best.price ? p : best))
  const firstProduct = lines[0].product

  return (
    <section className="suggested">
      <div className="suggested-heading">
        <span className="suggested-title">
          <Icon name="sparkle" size={18} />
          Suggested items for
        </span>
        <span className="chip">
          <Icon name="tag" size={14} />
          {firstProduct.name}
        </span>
        {customer && (
          <span className="chip">
            <Icon name="userCircle" size={14} />
            {customer.name}
          </span>
        )}
      </div>

      <div className="suggested-card">
        <ProductThumb product={suggestion} />
        <div className="suggested-text">
          <div className="suggested-name">{suggestion.name}</div>
          <div className="suggested-sku">SKU {suggestion.sku}</div>
        </div>
        <div className="suggested-price">{money(suggestion.price)}</div>
        <button type="button" className="suggested-add" onClick={() => onAdd(suggestion)}>
          Add
        </button>
      </div>
    </section>
  )
}

export default SuggestedItems
