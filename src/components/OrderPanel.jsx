import Icon from './Icon.jsx'
import ProductThumb from './ProductThumb.jsx'
import { money } from '../format.js'
import './OrderPanel.css'

const TAX_RATE = 0.13

function OrderPanel({
  orderNumber,
  salesperson,
  customer,
  lines,
  onChangeCustomer,
  onAddProduct,
  onRemoveLine,
}) {
  const subtotal = lines.reduce((sum, line) => sum + line.product.price, 0)
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100
  const total = subtotal + tax
  const isNew = !customer && lines.length === 0

  return (
    <aside className="order-panel">
      <header className="order-header">
        <div>
          <h1 className="order-title">{isNew ? 'New order' : `Order ${orderNumber}`}</h1>
          <p className="order-salesperson">
            Sales person: {salesperson.name}
            <button type="button" className="link-button">Change</button>
          </p>
        </div>
        <button type="button" className="icon-button" aria-label="More options">
          <Icon name="kebab" size={20} />
        </button>
      </header>

      {customer ? (
        <div className="order-customer">
          <span>{customer.name}</span>
          <button type="button" className="link-button" onClick={onChangeCustomer}>
            Change
          </button>
        </div>
      ) : (
        <button type="button" className="order-customer empty" onClick={onChangeCustomer}>
          Add customer
        </button>
      )}

      <div className="order-lines">
        {lines.length === 0 && (
          <div className="order-empty">
            <Icon name="scanner" size={40} />
            <p>Scan or search to add items to the order.</p>
            <button type="button" className="primary-button" onClick={onAddProduct}>
              Add product
            </button>
          </div>
        )}
        {lines.map((line) => (
          <div key={line.lineId} className="order-line">
            <ProductThumb product={line.product} />
            <div className="order-line-text">
              <div className="order-line-name">{line.product.name}</div>
              <div className="order-line-sku">SKU {line.product.sku}</div>
            </div>
            <div className="order-line-price">{money(line.product.price)}</div>
            <button
              type="button"
              className="icon-button remove-button"
              aria-label={`Remove ${line.product.name}`}
              onClick={() => onRemoveLine(line.lineId)}
            >
              <Icon name="close" size={16} />
            </button>
          </div>
        ))}

        {lines.length > 0 && (
          <div className="order-totals">
            <div className="totals-row">
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            <div className="totals-row">
              <span>HST 13%</span>
              <span>{money(tax)}</span>
            </div>
            <div className="totals-row total">
              <span>Total</span>
              <span>{money(total)}</span>
            </div>
          </div>
        )}
      </div>

      <footer className="order-footer">
        <button type="button" className="charge-button" disabled={lines.length === 0}>
          <Icon name="card" size={20} />
          Charge {money(total)}
        </button>
      </footer>
    </aside>
  )
}

export default OrderPanel
