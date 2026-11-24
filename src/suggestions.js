// Smarter suggestions for the order screen.
//
// In a real product these suggestions would come from an AI model that
// looks at the customer's history, their plan and what's in the cart.
// The simple rules below stand in for that model, using the mock data.
//
// Each rule may return one suggestion: { product, reason, action, score }
//   reason: one line telling the associate why it fits this customer,
//           written about the customer ("Their current iPhone 12 case…")
//   action: 'swap' replaces the phone in the order, 'add' adds a new line
//   score:  higher means more relevant. The top 3 are shown.

import { money, shortModel as shortName } from './format.js'

const MAX_SUGGESTIONS = 3

// ---------- small helpers ----------

function findProduct(products, id) {
  return products.find((p) => p.id === id)
}

function yearsSince(dateString) {
  const ms = Date.now() - new Date(dateString).getTime()
  return ms / (1000 * 60 * 60 * 24 * 365)
}

function brandOf(phone) {
  return phone.model.split(' ')[0] // "iPhone", "Samsung" or "Google"
}

function fits(accessory, phone) {
  return accessory.compatibleWith.includes(phone.model)
}

function isCase(p) {
  return p.id.startsWith('a-case')
}

function isScreenProtector(p) {
  return p.id.startsWith('a-screen')
}

// ---------- the rules ----------

// Old phone and nothing in the order yet: suggest the entry model of the
// same brand's newest line.
function upgradeOldPhone({ ownedPhone, orderPhone, products }) {
  if (!ownedPhone || orderPhone) return null
  const age = yearsSince(ownedPhone.date)
  if (age < 2) return null

  const options = products
    .filter((p) => p.category === 'device')
    .filter((p) => brandOf(p) === brandOf(ownedPhone.product))
    .filter((p) => p.model !== ownedPhone.product.model)
    .sort((a, b) => a.price - b.price)
  if (options.length === 0) return null

  return {
    product: options[0],
    reason: `Their current ${shortName(ownedPhone.product)} is about ${Math.round(age)} years old.`,
    action: 'add', // no phone in the order yet, so there's nothing to swap
    score: 95,
  }
}

// Phone in the order: offer the same model with more storage.
function moreStorage({ orderPhone, products }) {
  if (!orderPhone) return null
  const bigger = products
    .filter((p) => p.model === orderPhone.model && p.price > orderPhone.price)
    .sort((a, b) => a.price - b.price)[0]
  if (!bigger) return null

  const extra = bigger.price - orderPhone.price
  return {
    product: bigger,
    reason: `Same phone with more storage for ${money(extra)} more.`,
    action: 'swap',
    score: 50,
  }
}

// Uses most of their data: suggest the next plan up.
function biggerPlan({ customer, plan, products, inOrder }) {
  if (!customer || !plan || customer.avgDataUsePercent < 85) return null
  if (inOrder.some((p) => p.category === 'plan')) return null

  const next = products
    .filter((p) => p.category === 'plan' && p.dataGB > plan.dataGB)
    .sort((a, b) => a.dataGB - b.dataGB)[0]
  if (!next) return null

  return {
    product: next,
    // Kept vague on purpose: the customer can often see the screen, so the
    // exact usage number stays in their plan details, not on the counter.
    reason: 'Often close to their data limit.',
    action: 'add',
    score: 85,
  }
}

// A case that fits the phone they'll walk out with.
function caseForPhone({ customer, phone, ownedPhone, orderPhone, owned, products }) {
  if (!phone) return null
  const newCase = products.find((p) => isCase(p) && fits(p, phone))
  if (!newCase) return null

  const oldCase = owned.find((p) => isCase(p))
  const isNewPhone = ownedPhone && ownedPhone.product.model !== phone.model
  if (oldCase && isNewPhone) {
    return {
      product: newCase,
      reason: `Their current ${shortName(ownedPhone.product)} case won't fit the ${shortName(phone)}.`,
      action: 'add',
      score: 90,
    }
  }
  let reason = `Protects the new ${shortName(phone)}.`
  if (customer) {
    reason = orderPhone
      ? `They don't have a case for the new ${shortName(phone)}.`
      : `They don't have a case for their ${shortName(phone)}.`
  }
  return {
    product: newCase,
    reason,
    action: 'add',
    score: 65,
  }
}

// A screen protector that fits the phone.
function screenProtectorForPhone({ customer, phone, orderPhone, products }) {
  if (!phone) return null
  const protector = products.find((p) => isScreenProtector(p) && fits(p, phone))
  if (!protector) return null
  let reason = `Keeps the ${shortName(phone)} screen scratch-free.`
  if (customer) {
    reason = orderPhone
      ? `The new ${shortName(phone)} needs a screen protector.`
      : `They don't have a screen protector for their ${shortName(phone)}.`
  }
  return {
    product: protector,
    reason,
    action: 'add',
    score: 60,
  }
}

// No protection plan on their phone.
function protectionPlan({ customer, phone, ownedPhone, orderPhone, products }) {
  if (!phone) return null
  const plan = findProduct(products, 'ad-protection')
  const age = ownedPhone && !orderPhone ? Math.round(yearsSince(ownedPhone.date)) : 0
  let reason = `Covers the new ${shortName(phone)} against drops and damage.`
  if (age >= 2) reason = `Their phone is about ${age} years old and has no protection plan.`
  else if (customer) reason = `They've never had a protection plan for their phones.`
  return {
    product: plan,
    reason,
    action: 'add',
    score: orderPhone ? 80 : 70,
  }
}

// No fast charger on file.
function fastCharger({ phone, orderPhone, products }) {
  if (!phone) return null
  return {
    product: findProduct(products, 'ad-fastcharger'),
    reason: orderPhone
      ? `The ${shortName(phone)} ships without a charger.`
      : "They haven't bought a fast charger from us.",
    action: 'add',
    score: 40,
  }
}

const rules = [
  upgradeOldPhone,
  moreStorage,
  biggerPlan,
  caseForPhone,
  screenProtectorForPhone,
  protectionPlan,
  fastCharger,
]

// ---------- main entry point ----------

// `hiddenIds` holds products the associate dismissed or marked not relevant.
// They're skipped, so the next-ranked suggestion moves up to fill the gap.
export function getSuggestions({ customer, lines, products, hiddenIds = new Set() }) {
  const inOrder = lines.map((line) => line.product)

  // What the customer already owns, from their purchase history.
  const history = customer
    ? customer.purchaseHistory.map((h) => ({ product: findProduct(products, h.productId), date: h.date }))
    : []
  const owned = history.map((h) => h.product)
  const ownedPhone = history.filter((h) => h.product.category === 'device').at(-1)

  // The phone in the order (the latest one added), if any.
  const orderPhone = inOrder.filter((p) => p.category === 'device').at(-1)

  // The phone they'll leave with: the new one if there is one, otherwise their current one.
  const phone = orderPhone || ownedPhone?.product

  const plan = customer ? findProduct(products, customer.currentPlan) : null

  const facts = { customer, products, inOrder, owned, ownedPhone, orderPhone, phone, plan }

  const inOrderIds = new Set(inOrder.map((p) => p.id))
  const ownedIds = new Set(owned.map((p) => p.id))
  if (plan) ownedIds.add(plan.id)

  return rules
    .map((rule) => rule(facts))
    .filter(Boolean)
    // Never suggest something already in the order or already owned.
    .filter((s) => !inOrderIds.has(s.product.id) && !ownedIds.has(s.product.id))
    // Skip anything the associate hid.
    .filter((s) => !hiddenIds.has(s.product.id))
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_SUGGESTIONS)
}
