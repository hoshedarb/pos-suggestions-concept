// Simple line icons drawn with inline SVG. No icon library needed.

const paths = {
  cart: 'M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6.2 M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M17 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
  dashboard: 'M4 4h7v7H4z M13 4h7v4h-7z M13 10h7v10h-7z M4 13h7v7H4z',
  orders: 'M6 3h12v18l-3-2-3 2-3-2-3 2z M9 8h6 M9 12h6',
  customers: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21a8 8 0 0 1 16 0',
  inventory: 'M3 7l9-4 9 4-9 4z M3 7v10l9 4 9-4V7 M12 11v10',
  more: 'M5 12h.01 M12 12h.01 M19 12h.01',
  userCircle: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M6.5 18a6 6 0 0 1 11 0',
  upload: 'M12 15V4 M7 9l5-5 5 5 M5 15v4h14v-4',
  tag: 'M3 12V4h8l10 10-8 8z M7.5 8.5h.01',
  percent: 'M19 5L5 19 M7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z',
  phone: 'M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z M11 18h2',
  box: 'M3 7l9-4 9 4-9 4z M3 7v10l9 4 9-4V7 M12 11v10',
  close: 'M6 6l12 12 M18 6L6 18',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z M20 20l-4-4',
  card: 'M3 6h18v12H3z M3 10h18',
  kebab: 'M12 5h.01 M12 12h.01 M12 19h.01',
  tradeIn: 'M4 9a8 8 0 0 1 14.5-3.5L20 7 M20 3v4h-4 M20 15a8 8 0 0 1-14.5 3.5L4 17 M4 21v-4h4',
  check: 'M5 12.5l4.5 4.5L19 7',
  help: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6 M12 17h.01',
  barcode: 'M3 7V4h3 M18 4h3v3 M21 17v3h-3 M6 20H3v-3 M7 8v8 M10 8v8 M12.5 8v8 M15 8v8 M17 8v8',
  scanner: 'M3 5h11a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H9.5l-2 9h-3l2-9H5a2 2 0 0 1-2-2z M19 4.5l2.5-1.5 M19.5 7.5H22 M19 10.5l2.5 1.5',
}

function Icon({ name, size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  )
}

export default Icon
