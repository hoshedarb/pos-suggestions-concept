import './ProductThumb.css'

// Simple drawn product pictures (inline SVG). Each product's `image`
// field in products.js picks one of these drawings.

function Lens({ x, y, r = 2 }) {
  return <circle cx={x} cy={y} r={r} fill="#16181d" stroke="#8b8f98" strokeWidth="0.6" />
}

const drawings = {
  'phone-apple-pro': (
    <>
      <rect x="13" y="4" width="22" height="40" rx="5" fill="#6b6f78" />
      <rect x="15.5" y="6.5" width="11" height="11" rx="3" fill="#575a62" />
      <Lens x={18.5} y={9.5} />
      <Lens x={18.5} y={14.5} />
      <Lens x={23.5} y={12} />
      <circle cx="23.5" cy="8.2" r="0.8" fill="#efe8d2" />
    </>
  ),
  'phone-apple-classic': (
    <>
      <rect x="13" y="4" width="22" height="40" rx="5" fill="#2f4a7a" />
      <rect x="15.5" y="6.5" width="8.5" height="9.5" rx="2.5" fill="#3d5b90" />
      <Lens x={18} y={9.2} r={1.6} />
      <Lens x={21.5} y={13.2} r={1.6} />
    </>
  ),
  'phone-samsung': (
    <>
      <rect x="14" y="4" width="20" height="40" rx="4" fill="#3a4256" />
      <Lens x={18.5} y={9} />
      <Lens x={18.5} y={14} />
      <Lens x={18.5} y={19} />
      <circle cx="22.5" cy="9" r="0.8" fill="#efe8d2" />
    </>
  ),
  'phone-google': (
    <>
      <rect x="13.5" y="4" width="21" height="40" rx="6" fill="#b9c9b0" />
      <rect x="13.5" y="10" width="21" height="6" rx="3" fill="#2a2d33" />
      <circle cx="19" cy="13" r="1.6" fill="#4a4f58" />
      <circle cx="24" cy="13" r="1.6" fill="#4a4f58" />
      <circle cx="29" cy="13" r="0.8" fill="#efe8d2" />
    </>
  ),
  case: (
    <>
      <rect x="12" y="3" width="24" height="42" rx="6" fill="#b9a8fa" />
      <rect x="14.5" y="5.5" width="12" height="12" rx="3.5" fill="#ece8fe" />
      <rect x="35" y="12" width="2" height="6" rx="1" fill="#9d88f3" />
    </>
  ),
  'screen-protector': (
    <>
      <rect x="13" y="4" width="22" height="40" rx="5" fill="#e6f0fb" stroke="#9db8d9" strokeWidth="1" />
      <rect x="21" y="7" width="6" height="2" rx="1" fill="#9db8d9" />
      <path d="M17 26l10-10 M17 32l14-14" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  protection: (
    <>
      <path d="M24 5l13 5v11c0 9-6 16-13 19-7-3-13-10-13-19V10z" fill="#6c4cf1" />
      <path d="M18.5 23l4 4 7.5-8" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  charger: (
    <>
      <rect x="19" y="7" width="2.5" height="8" rx="1" fill="#9aa0ab" />
      <rect x="26.5" y="7" width="2.5" height="8" rx="1" fill="#9aa0ab" />
      <rect x="15" y="14" width="18" height="21" rx="4" fill="#ffffff" stroke="#c3c7d0" strokeWidth="1" />
      <path d="M24 35v3c0 3 3 5 7 5" fill="none" stroke="#c3c7d0" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  watch: (
    <>
      <rect x="18" y="3" width="12" height="42" rx="3" fill="#3a4256" />
      <rect x="14.5" y="13" width="19" height="22" rx="6" fill="#1f2126" />
      <rect x="17" y="15.5" width="14" height="17" rx="4" fill="#2b2f4a" />
      <path d="M21 24h6" stroke="#b9a8fa" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  plan: (
    <>
      <path d="M15 4h13l8 8v30a2 2 0 0 1-2 2H15a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill="#ece8fe" stroke="#b9a8fa" strokeWidth="1" />
      <rect x="18" y="20" width="12" height="14" rx="2" fill="#e1cb6e" stroke="#b49e3c" strokeWidth="0.8" />
      <path d="M24 20v14 M18 27h12" stroke="#b49e3c" strokeWidth="0.8" />
    </>
  ),
}

function ProductThumb({ product, size = 44 }) {
  return (
    <div className="product-thumb" style={{ width: size, height: size }}>
      <svg viewBox="0 0 48 48" width={size * 0.82} height={size * 0.82} aria-hidden="true">
        {drawings[product.image]}
      </svg>
    </div>
  )
}

export default ProductThumb
