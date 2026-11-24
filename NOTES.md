# Where I changed or rejected AI output

**1. Reason wording**
> **What Claude did:** Wrote suggestion reasons like "High-value upsell opportunity" and "Customer eligible for premium device."
> **What I changed:** Rewrote them as things an associate can say out loud, like "Their current iPhone 12 case won't fit the iPhone 18 Pro."
> **Why:** The associate reads the reason to the customer. Internal sales language sounds pushy and breaks trust at the counter.
> **Trade-off:** Customer-facing reasons are harder to generate and may not cover every case. I'd rather show fewer suggestions than ones the associate can't say.

**2. Ranking**
> **What Claude did:** Ranked suggestions by price, so the most expensive device always came first.
> **What I changed:** Ranked by relevance to this customer instead, so a $40 case that won't fit their new phone can outrank a $1,600 upgrade.
> **Why:** That price-first logic is the pattern in the current screen. Suggestions that feel random or pushy get ignored, and ignored suggestions earn nothing.
> **Trade-off:** A possibly lower average ticket per suggestion, in exchange for suggestions associates actually use. I'd test that with real attach rates.

**3. Swap vs. Add**
> **What Claude did:** Labelled the phone-upgrade suggestion "Swap" even when the order had no phone in it yet.
> **What I changed:** It now says "Add" when there's nothing to replace, and "Swap" only when a phone is already in the order.
> **Why:** A button label should say exactly what will happen. "Swap" with nothing to swap makes the associate hesitate or tap just to find out.
> **Trade-off:** The same kind of suggestion can show two different labels depending on what's in the order. A small inconsistency, but a clearer action.

**4. Product images**
> **What Claude did:** Used plain grey placeholder squares for every product image.
> **What I changed:** Considered pulling real photos from a retailer site like Best Buy, then chose simple drawn illustrations of each phone and accessory instead.
> **Why:** Retailer photos are copyrighted and their terms forbid scraping, which is riskier in a public portfolio repo. Drawings stay consistent and live in the project, so they can't break.
> **Trade-off:** Not photoreal, so the screen looks less like a live store system. That's fine for a concept, and real images could be swapped in later.
