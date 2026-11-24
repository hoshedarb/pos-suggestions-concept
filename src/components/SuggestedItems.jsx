import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'
import ProductThumb from './ProductThumb.jsx'
import { money } from '../format.js'
import { getSuggestions } from '../suggestions.js'
import './SuggestedItems.css'

const CONFIRMATION_MS = 3000

// Shows 2–3 ranked suggestions as soon as a customer is picked or a
// product is added. Each has a one-line reason, an Add or Swap button,
// and a ⋮ menu to Dismiss it or mark it Not relevant.
function SuggestedItems({
  products,
  lines,
  customer,
  onAdd,
  onSwap,
  hiddenIds,
  onDismiss,
  onNotRelevant,
}) {
  const [openMenuId, setOpenMenuId] = useState(null)
  const [confirmation, setConfirmation] = useState(null)

  // Hide the "Thanks…" message after a few seconds.
  useEffect(() => {
    if (!confirmation) return
    const timer = setTimeout(() => setConfirmation(null), CONFIRMATION_MS)
    return () => clearTimeout(timer)
  }, [confirmation])

  if (!customer && lines.length === 0) return null

  const suggestions = getSuggestions({ customer, lines, products, hiddenIds })
  if (suggestions.length === 0 && !confirmation) return null

  const firstProduct = lines[0]?.product

  function handleDismiss(productId) {
    setOpenMenuId(null)
    onDismiss(productId)
  }

  function handleNotRelevant(productId) {
    setOpenMenuId(null)
    onNotRelevant(productId)
    setConfirmation({ id: Date.now(), text: 'Thanks! This helps improve future suggestions.' })
  }

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
        <span className="suggested-confirmation" role="status">
          {confirmation && <span key={confirmation.id}>{confirmation.text}</span>}
        </span>
      </div>

      {suggestions.length > 0 && (
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

              <div className="suggested-more">
                <button
                  type="button"
                  className="suggested-more-button"
                  aria-label={`More options for ${s.product.name}`}
                  aria-expanded={openMenuId === s.product.id}
                  onClick={() => setOpenMenuId(openMenuId === s.product.id ? null : s.product.id)}
                >
                  <Icon name="kebab" size={20} />
                </button>

                {openMenuId === s.product.id && (
                  <>
                    {/* Invisible layer: tapping anywhere else closes the menu. */}
                    <div className="menu-backdrop" onClick={() => setOpenMenuId(null)} />
                    <div className="suggested-menu" role="menu">
                      <button type="button" role="menuitem" onClick={() => handleDismiss(s.product.id)}>
                        Dismiss
                      </button>
                      <button type="button" role="menuitem" onClick={() => handleNotRelevant(s.product.id)}>
                        Not relevant
                      </button>
                    </div>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default SuggestedItems
