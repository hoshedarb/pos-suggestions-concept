// Mock customers. All names and phone numbers are invented.
// currentPlan and purchaseHistory productId values refer to ids in products.js.
// avgDataUsePercent is average monthly data use as a percent of the current plan.

export const customers = [
  {
    id: 'c-001',
    name: 'Maya Okafor',
    phone: '(604) 555-0142',
    currentPlan: 'pl-20gb',
    avgDataUsePercent: 95,
    purchaseHistory: [
      { productId: 'p-iphone12-128', date: '2023-11-18' },
      { productId: 'a-case-iphone12', date: '2023-11-18' },
    ],
  },
  {
    id: 'c-002',
    name: 'Daniel Brightwater',
    phone: '(416) 555-0187',
    currentPlan: 'pl-75gb',
    avgDataUsePercent: 40,
    purchaseHistory: [
      { productId: 'p-galaxys26-256', date: '2026-08-09' },
      { productId: 'a-case-galaxys26', date: '2026-08-09' },
      { productId: 'ad-protection', date: '2026-08-09' },
      { productId: 'ad-watchline', date: '2026-09-21' },
    ],
  },
]
