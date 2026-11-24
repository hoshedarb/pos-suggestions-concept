import { useEffect } from 'react'
import Icon from './Icon.jsx'
import './WelcomeModal.css'

// Short guide shown every time the prototype opens. Nothing is saved, so it
// always comes back on refresh. Mirrors the "Try it" section of the README.
const scenarios = [
  {
    title: 'Maya Okafor',
    text: 'Pick her as the customer to see suggestions from her history. Add the iPhone 18 Pro and watch them update.',
  },
  {
    title: 'Add vs. Swap',
    text: 'Pick Daniel Brightwater, add the iPhone 18 Pro 256 GB, then tap Swap on the 512 GB suggestion.',
  },
  {
    title: 'Trade-in',
    text: 'With Maya and the iPhone 18 Pro in the order, tap "Trade in their iPhone 12?" and pick a condition.',
  },
  {
    title: 'Dismiss or Not relevant',
    text: 'Tap ⋮ on any suggestion. The next one moves up to take its place.',
  },
]

function WelcomeModal({ onClose }) {
  // Esc closes it too.
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="welcome-backdrop">
      <div className="welcome-modal" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
        <div className="welcome-badge">
          <Icon name="sparkle" size={20} />
        </div>
        <h2 id="welcome-title">Smarter suggestions at the counter</h2>
        <p className="welcome-description">
          An order screen where in-store suggestions fit the customer, with a reason the associate can use.
        </p>

        <h3 className="welcome-subhead">Try it</h3>
        <ol className="welcome-steps">
          {scenarios.map((s) => (
            <li key={s.title}>
              <strong>{s.title}.</strong> {s.text}
            </li>
          ))}
        </ol>

        <p className="welcome-disclaimer">
          Unofficial, self-initiated design concept. Not affiliated with any company.
        </p>

        <div className="welcome-actions">
          <button type="button" className="welcome-start" onClick={onClose} autoFocus>
            Start exploring
          </button>
        </div>
      </div>
    </div>
  )
}

export default WelcomeModal
