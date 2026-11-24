import { useState } from 'react'
import Icon from './Icon.jsx'
import './SlideInPanel.css'

// A panel that slides up from the bottom and covers the left work area.
// `matches(item, query)` decides which items show for the search text.
// `renderItem(item)` draws one row. Tapping a row calls `onPick(item)`.
// `action` is an optional button shown at the top right.
// `searchExtra` is an optional icon shown at the end of the search field.
function SlideInPanel({
  title,
  placeholder,
  items,
  matches,
  renderItem,
  onPick,
  onClose,
  action,
  searchExtra,
}) {
  const [query, setQuery] = useState('')
  const visible = items.filter((item) => matches(item, query.trim().toLowerCase()))

  return (
    <div className="slide-in-panel">
      <div className="slide-in-handle" />

      <header className="slide-in-header">
        <button type="button" className="icon-button" aria-label="Close" onClick={onClose}>
          <Icon name="close" size={22} />
        </button>
        <h2>{title}</h2>
        {action}
      </header>

      <label className="slide-in-search">
        <Icon name="search" size={18} />
        <input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        {searchExtra}
      </label>

      <ul className="slide-in-list">
        {visible.map((item) => (
          <li key={item.id}>
            <button type="button" className="slide-in-row" onClick={() => onPick(item)}>
              {renderItem(item)}
            </button>
          </li>
        ))}
        {visible.length === 0 && <li className="slide-in-empty">No matches</li>}
      </ul>
    </div>
  )
}

export default SlideInPanel
