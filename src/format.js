// Formats a number as Canadian dollars, e.g. 1075 -> "$1,075.00"
const formatter = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
})

export function money(amount) {
  return formatter.format(amount)
}

// Shorter phone name for tight spaces: "Samsung Galaxy S26" -> "Galaxy S26"
export function shortModel(phone) {
  return phone.model.replace(/^(Samsung|Google) /, '')
}
