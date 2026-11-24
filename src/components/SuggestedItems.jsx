import Icon from './Icon.jsx'
import ProductThumb from './ProductThumb.jsx'
import { money } from '../format.js'
import { getSuggestions } from '../suggestions.js'
import './SuggestedItems.css'

// Shows 2–3 ranked suggestions as soon as a customer is picked or a
// product is added. Each has a one-line reason and an Add or Swap button.
function SuggestedItems({ products, lines, customer, onAdd, onSwap }) {
  if (!customer && lines.length === 0) return null

  const suggestions = getSuggestions({ customer, lines, products })
  if (suggestions.length === 0) return null

  const firstProduct = lines[0]?.product

  return (
    <section className="suggested">
      <div className="suggested-heading">
        <span className="suggested-title">
          <Icon name="sparkle" size={18} />
          Suggested items for
        </span>
        {firstProduct && (
          <span className="chip">
            <Icon name="tag" size={14} />
            {firstProduct.name}
          </span>
        )}
        {customer && (
          <span className="chip">
            <Icon name="userCircle" size={14} />
            {customer.name}
          </span>
        )}
      </div>

      <ul className="suggested-list">
        {suggestions.map((s) => (
          <li key={s.product.id} className="suggested-row">
            <ProductThumb product={s.product} size={40} />
            <div className="suggested-text">
              <div className="suggested-name">{s.product.name}</div>
              <div className="suggested-reason">{s.reason}</div>
            </div>
            <div className="suggested-price">{money(s.product.price)}</div>
            <button
              type="button"
              className="suggested-action"
              onClick={() => (s.action === 'swap' ? onSwap(s.product) : onAdd(s.product))}
            >
              {s.action === 'swap' ? 'Swap' : 'Add'}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SuggestedItems
