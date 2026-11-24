import { useState } from 'react'
import Icon from './Icon.jsx'
import ProductThumb from './ProductThumb.jsx'
import { money, shortModel } from '../format.js'
import './SlideInPanel.css'
import './TradeInPanel.css'

const conditions = [
  { id: 'good', label: 'Good', description: 'Works perfectly. Light signs of use.' },
  { id: 'fair', label: 'Fair', description: 'Works well. Visible scratches or dents.' },
  { id: 'poor', label: 'Poor', description: 'Cracked screen or other damage. Still turns on.' },
]

// Slides up like the other panels. The associate picks the condition of the
// customer's old phone, sees the credit for each, then confirms.
function TradeInPanel({ device, onConfirm, onClose }) {
  const [condition, setCondition] = useState(null)
  const amount = condition ? device.tradeIn[condition] : 0

  return (
    <div className="slide-in-panel">
      <div className="slide-in-handle" />

      <header className="slide-in-header">
        <button type="button" className="icon-button" aria-label="Close" onClick={onClose}>
          <Icon name="close" size={22} />
        </button>
        <h2>Trade-in</h2>
      </header>

      <div className="trade-in-body">
        <div className="trade-in-device">
          <ProductThumb product={device} size={52} />
          <div>
            <div className="trade-in-device-name">Their {shortModel(device)}</div>
            <div className="trade-in-device-sub">Pick the condition after checking the phone.</div>
          </div>
        </div>

        <div className="trade-in-options" role="radiogroup" aria-label="Condition">
          {conditions.map((c) => (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={condition === c.id}
              className={condition === c.id ? 'trade-in-option selected' : 'trade-in-option'}
              onClick={() => setCondition(c.id)}
            >
              <span className="trade-in-radio">
                {condition === c.id && <Icon name="check" size={14} />}
              </span>
              <span className="trade-in-option-text">
                <span className="trade-in-option-label">{c.label}</span>
                <span className="trade-in-option-description">{c.description}</span>
              </span>
              <span className="trade-in-option-credit">{money(device.tradeIn[c.id])}</span>
            </button>
          ))}
        </div>
      </div>

      <footer className="trade-in-footer">
        <button
          type="button"
          className="trade-in-confirm"
          disabled={!condition}
          onClick={() => onConfirm(condition, amount)}
        >
          {condition ? `Apply ${money(amount)} credit` : 'Pick a condition'}
        </button>
      </footer>
    </div>
  )
}

export default TradeInPanel
