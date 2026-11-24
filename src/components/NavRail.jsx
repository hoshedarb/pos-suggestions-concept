import Icon from './Icon.jsx'
import './NavRail.css'

const items = [
  { id: 'create', label: 'Create order', icon: 'cart' },
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'orders', label: 'Orders', icon: 'orders' },
  { id: 'customers', label: 'Customers', icon: 'customers' },
  { id: 'inventory', label: 'Inventory', icon: 'inventory' },
  { id: 'more', label: 'More', icon: 'more' },
]

// Only "Create order" works. It's the screen we're already on.
function NavRail() {
  return (
    <nav className="nav-rail">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={item.id === 'create' ? 'nav-item active' : 'nav-item'}
        >
          <span className="nav-icon">
            <Icon name={item.icon} size={20} />
          </span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  )
}

export default NavRail
