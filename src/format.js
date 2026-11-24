// Formats a number as Canadian dollars, e.g. 1075 -> "$1,075.00"
const formatter = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
})

export function money(amount) {
  return formatter.format(amount)
}
