# Smarter Suggestions for a Telecom POS

Unofficial, self-initiated design concept. Not affiliated with any company.

An associate-facing order screen for a store tablet, redesigned so in-store suggestions fit the customer at the counter.

## Live demo

**[pos-suggestions-concept.netlify.app](https://pos-suggestions-concept.netlify.app)**

Best viewed in a landscape, tablet-sized browser window (about 1180 × 820).

## How I built it

**[Problem, concept and decisions canvas](https://claude.ai/artifact/TeZowDos2UbekwqkqxhekD#play-15dd8cd198dd)**

1. I laid out the problem, before and after concepts, and decisions on a Claude canvas.
2. I built the prototype with Claude Code.
3. Each change went through its own Git branch and pull request.

**Pull requests**
- [Smarter suggestions with reasons and swap](https://github.com/hoshedarb/pos-suggestions-concept/pull/1)
- [Dismiss and not-relevant controls for suggestions](https://github.com/hoshedarb/pos-suggestions-concept/pull/2)
- [Trade-in credit in the order panel](https://github.com/hoshedarb/pos-suggestions-concept/pull/3)
- [Welcome popup, softer data-use reason, README and notes](https://github.com/hoshedarb/pos-suggestions-concept/pull/4)

Where I rejected or changed AI output, and why: [NOTES.md](NOTES.md).

## The problem

On a typical telecom POS order screen, suggestions only appear after a product is added, and they show one item: the most expensive phone in the catalog. There's no reason the associate can pass on to the customer and no way to dismiss it, so associates learn to ignore it.

## What I changed

1. **Suggestions start with the customer.** They appear as soon as a customer is picked, based on their purchase history, plan and data use, and update as items are added.
2. **Two or three ranked suggestions, each with a reason.** A one-line reason tells the associate why it fits, e.g. "Their current iPhone 12 case won't fit the iPhone 18 Pro."
3. **Add or Swap.** Accessories, add-ons and plans are added. A phone upgrade replaces the phone already in the order instead of adding a second one.
4. **Dismiss or Not relevant.** The associate can hide any suggestion. The next one moves up to fill its place.
5. **Trade-in credit.** If the customer owns an eligible phone, the order offers a trade-in and applies the credit to the total.
6. **Privacy at the counter.** Reasons avoid exact personal numbers, since the customer can often see the screen.

## Try it

A short version of these steps opens in a popup every time the prototype loads. Tap **Start exploring** to close it, and reopen it any time with the **How to use prototype** button in the bottom-left corner.

**1. Maya Okafor: an old phone and a full data plan**
1. Tap **Add customer** and pick **Maya Okafor**.
2. Three suggestions appear: an iPhone 18 Pro ("Their current iPhone 12 is about 3 years old."), a bigger plan ("Often close to their data limit.") and a protection plan.
3. Tap **Add** on the iPhone 18 Pro. The phone joins the order, and the suggestions update. The top one is now a case: "Their current iPhone 12 case won't fit the iPhone 18 Pro."

**2. Daniel Brightwater: Add vs. Swap**
1. Tap **Add customer** and pick **Daniel Brightwater**. He already owns a recent Galaxy S26 with a case and protection, so only two small suggestions appear.
2. Tap **Add product** and pick **iPhone 18 Pro 256 GB**.
3. The suggestions now include **iPhone 18 Pro 512 GB** with a **Swap** button. Tap it. The 256 GB phone is replaced, not duplicated, and the total updates.

**3. Trade-in**
1. With Maya picked and the iPhone 18 Pro in the order (scenario 1), tap **"Trade in their iPhone 12? Up to $180.00 credit."** under the phone.
2. Pick **Fair** ($110.00) and tap **Apply $110.00 credit**.
3. A trade-in credit line appears under the phone. The phone keeps its full price, and the subtotal, HST and total drop.

**4. Dismiss or Not relevant**
1. With any customer picked, tap the **⋮** next to a suggestion.
2. Tap **Dismiss** to hide it for this order. Or tap **Not relevant** to hide it and see a quiet "Thanks! This helps improve future suggestions."
3. Either way, the next-ranked suggestion moves up, if there is one.

## What's real and what's mocked

**Real (working in the prototype)**
- The suggestion rules, ranking, reasons, and Add/Swap behaviour
- Order totals with 13% HST, including trade-in credit
- Dismiss and Not relevant, for the current session
- The welcome popup, which opens on every load and isn't remembered once closed

**Mocked**
- Two invented customers, about 20 products and trade-in values. Prices are approximate Canadian retail as of November 2026.
- Simple rules in [`src/suggestions.js`](src/suggestions.js) stand in for an AI model.
- No backend. Nothing is saved, and refreshing the page resets everything.
- Product images are simple drawings.
- Charge, Import activation, Add discount, Create customer, the barcode icon and the other navigation items don't do anything.

## Run it locally

```bash
npm install
npm run dev
```

Then open the address shown in the terminal (usually http://localhost:5173).
