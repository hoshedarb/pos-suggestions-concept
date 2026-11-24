import { useState } from 'react'
import Icon from './Icon.jsx'
import './ActionTiles.css'

// How long the pressed fill takes before the panel opens (milliseconds).
// Keep in sync with the animation length in ActionTiles.css.
const PRESS_DELAY = 360

// Only Add customer and Add product do something.
function ActionTiles({ onAddCustomer, onAddProduct }) {
  const [pressed, setPressed] = useState(null)

  const tiles = [
    { label: 'Add customer', icon: 'userCircle', onClick: onAddCustomer },
    { label: 'Import activation', icon: 'upload' },
    { label: 'Add product', icon: 'tag', onClick: onAddProduct },
    { label: 'Add discount', icon: 'percent' },
  ]

  // Show the pressed fill first, then open the panel once it has filled the card.
  function handlePress(tile) {
    if (!tile.onClick || pressed) return
    setPressed(tile.label)
    setTimeout(() => {
      tile.onClick()
      setPressed(null)
    }, PRESS_DELAY)
  }

  return (
    <div className="action-tiles">
      {tiles.map((tile) => (
        <button
          key={tile.label}
          type="button"
          className={pressed === tile.label ? 'action-tile pressed' : 'action-tile'}
          onClick={() => handlePress(tile)}
        >
          <span className="action-fill" />
          <span className="action-icon">
            <Icon name={tile.icon} size={22} />
          </span>
          <span className="action-label">{tile.label}</span>
        </button>
      ))}
    </div>
  )
}

export default ActionTiles
