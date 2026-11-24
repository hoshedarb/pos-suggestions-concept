import { useState } from 'react'
import NavRail from './components/NavRail.jsx'
import ActionTiles from './components/ActionTiles.jsx'
import SuggestedItems from './components/SuggestedItems.jsx'
import OrderPanel from './components/OrderPanel.jsx'
import SlideInPanel from './components/SlideInPanel.jsx'
import TradeInPanel from './components/TradeInPanel.jsx'
import ProductThumb from './components/ProductThumb.jsx'
import Icon from './components/Icon.jsx'
import { products } from './data/products.js'
import { customers } from './data/customers.js'
import { salesperson } from './data/salesperson.js'
import { money } from './format.js'
import './App.css'

let nextLineId = 1

// The customer's most recent phone that has trade-in values, or null.
function findTradeInDevice(customer) {
  if (!customer) return null
  const owned = customer.purchaseHistory
    .map((h) => products.find((p) => p.id === h.productId))
    .filter((p) => p.category === 'device' && p.tradeIn)
  return owned.at(-1) || null
}

const CONDITION_LABELS = { good: 'Good', fair: 'Fair', poor: 'Poor' }

function App() {
  const [customer, setCustomer] = useState(null)
  const [lines, setLines] = useState([])
  const [openPanel, setOpenPanel] = useState(null) // 'customer', 'product', 'tradeIn' or null

  // Applied trade-in: { lineId, device, condition, conditionLabel, amount } or null.
  // `lineId` is the phone line it sits under.
  const [tradeIn, setTradeIn] = useState(null)
  const tradeInDevice = findTradeInDevice(customer)

  function pickCustomer(newCustomer) {
    // A trade-in belongs to the customer who owns the old phone.
    if (newCustomer.id !== customer?.id) setTradeIn(null)
    setCustomer(newCustomer)
  }

  function applyTradeIn(condition, amount) {
    const phoneLine = lines.findLast((line) => line.product.category === 'device')
    setTradeIn({
      lineId: phoneLine.lineId,
      device: tradeInDevice,
      condition,
      conditionLabel: CONDITION_LABELS[condition],
      amount,
    })
    setOpenPanel(null)
  }

  // Suggestions the associate hid. Kept in memory only, so they reset on refresh.
  // dismissedIds: hidden for this order.
  // notRelevantIds: feedback that the suggestion wasn't relevant (this session).
  const [dismissedIds, setDismissedIds] = useState(new Set())
  const [notRelevantIds, setNotRelevantIds] = useState(new Set())
  const hiddenIds = new Set([...dismissedIds, ...notRelevantIds])

  function dismissSuggestion(productId) {
    setDismissedIds((current) => new Set(current).add(productId))
  }

  function markNotRelevant(productId) {
    setNotRelevantIds((current) => new Set(current).add(productId))
  }

  function addProduct(product) {
    setLines((current) => [...current, { lineId: nextLineId++, product }])
  }

  // Replace the phone in the order (the latest one) with a different phone.
  // If there's no phone yet, just add it. The phone line keeps its lineId,
  // so an applied trade-in stays with it.
  function swapPhone(newPhone) {
    setLines((current) => {
      const phoneLine = current.findLast((line) => line.product.category === 'device')
      if (!phoneLine) return [...current, { lineId: nextLineId++, product: newPhone }]
      return current.map((line) =>
        line.lineId === phoneLine.lineId ? { ...line, product: newPhone } : line,
      )
    })
  }

  function removeLine(lineId) {
    setLines((current) => current.filter((line) => line.lineId !== lineId))
    // Removing the phone also removes the trade-in under it.
    if (tradeIn && tradeIn.lineId === lineId) setTradeIn(null)
  }

  return (
    <div className="app">
      <NavRail />

      <main className="workspace">
        <ActionTiles
          onAddCustomer={() => setOpenPanel('customer')}
          onAddProduct={() => setOpenPanel('product')}
        />
        <SuggestedItems
          products={products}
          lines={lines}
          customer={customer}
          onAdd={addProduct}
          onSwap={swapPhone}
          hiddenIds={hiddenIds}
          onDismiss={dismissSuggestion}
          onNotRelevant={markNotRelevant}
        />

        {openPanel === 'customer' && (
          <SlideInPanel
            title="Add customer"
            placeholder="Search customers"
            items={customers}
            matches={(c, q) => c.name.toLowerCase().includes(q) || c.phone.includes(q)}
            action={
              <button type="button" className="outline-button">
                Create customer
              </button>
            }
            renderItem={(c) => (
              <div className="row-text">
                <div className="row-title">{c.name}</div>
                <div className="row-sub">{c.phone}</div>
              </div>
            )}
            onPick={(c) => {
              pickCustomer(c)
              setOpenPanel(null)
            }}
            onClose={() => setOpenPanel(null)}
          />
        )}

        {openPanel === 'product' && (
          <SlideInPanel
            title="Add product"
            placeholder="Search products"
            items={products}
            matches={(p, q) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)}
            searchExtra={
              <span className="search-extra" aria-label="Scan barcode">
                <Icon name="barcode" size={22} />
              </span>
            }
            renderItem={(p) => (
              <>
                <ProductThumb product={p} size={52} />
                <div className="row-text">
                  <div className="row-title">{p.name}</div>
                  <div className="row-sub">SKU {p.sku}</div>
                </div>
                <div className="row-price">{money(p.price)}</div>
              </>
            )}
            onPick={(p) => {
              addProduct(p)
              setOpenPanel(null)
            }}
            onClose={() => setOpenPanel(null)}
          />
        )}

        {openPanel === 'tradeIn' && tradeInDevice && (
          <TradeInPanel
            device={tradeInDevice}
            onConfirm={applyTradeIn}
            onClose={() => setOpenPanel(null)}
          />
        )}
      </main>

      <OrderPanel
        orderNumber={1042}
        salesperson={salesperson}
        customer={customer}
        lines={lines}
        onChangeCustomer={() => setOpenPanel('customer')}
        onAddProduct={() => setOpenPanel('product')}
        onRemoveLine={removeLine}
        tradeInDevice={tradeInDevice}
        tradeIn={tradeIn}
        onOpenTradeIn={() => setOpenPanel('tradeIn')}
        onRemoveTradeIn={() => setTradeIn(null)}
      />
    </div>
  )
}

export default App
