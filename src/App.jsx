import { useState } from 'react'
import NavRail from './components/NavRail.jsx'
import ActionTiles from './components/ActionTiles.jsx'
import SuggestedItems from './components/SuggestedItems.jsx'
import OrderPanel from './components/OrderPanel.jsx'
import SlideInPanel from './components/SlideInPanel.jsx'
import ProductThumb from './components/ProductThumb.jsx'
import Icon from './components/Icon.jsx'
import { products } from './data/products.js'
import { customers } from './data/customers.js'
import { salesperson } from './data/salesperson.js'
import { money } from './format.js'
import './App.css'

let nextLineId = 1

function App() {
  const [customer, setCustomer] = useState(null)
  const [lines, setLines] = useState([])
  const [openPanel, setOpenPanel] = useState(null) // 'customer', 'product' or null

  function addProduct(product) {
    setLines((current) => [...current, { lineId: nextLineId++, product }])
  }

  // Replace the phone in the order (the latest one) with a different phone.
  // If there's no phone yet, just add it.
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
              setCustomer(c)
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
      </main>

      <OrderPanel
        orderNumber={1042}
        salesperson={salesperson}
        customer={customer}
        lines={lines}
        onChangeCustomer={() => setOpenPanel('customer')}
        onAddProduct={() => setOpenPanel('product')}
        onRemoveLine={removeLine}
      />
    </div>
  )
}

export default App
