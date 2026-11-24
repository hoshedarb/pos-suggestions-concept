# Where I changed or rejected AI output

**1. Reason wording**
> **What Claude did:** Wrote suggestion reasons like "High-value upsell opportunity" and "Customer eligible for premium device."
>
> **What I changed:** Rewrote them as things an associate can easily say out loud, like "Your current iPhone 12 case won't fit the iPhone 18 Pro."
>
> **Why:** Less overhead for the associate to not have to translate sales language into normal parlance for the customer. Also, easier for junior or newly joined associates to use with less training.
>
> **Trade-off:** Customer-facing reasons may get too long or not cover every case. Some suggestions only have a general reason, so I ranked them below personal ones instead of hiding them. I'd only drop suggestions with no honest reason an associate could say, and I'd test whether showing them anyway lifts attach rates.(This also depends on the kind of training a client provides to their store associates)

**2. Ranking**
> **What Claude did:** Ranked suggestions by price, so the most expensive device always came first.
>
> **What I changed:** Ranked suggestions by relevance to the selected customer instead, so a $40 case that won't fit their new phone can outrank a $1,600 upgrade.
>
> **Why:** Suggestions that feel random or pushy and sales heavy may get get ignored by the customer, which earns the store no additional sale.
>
> **Trade-off:** A possibly lower average ticket per suggestion, in exchange for suggestions associates can frequently execute successfully. I'd test that with real attach rates.

**3. Swap vs. Add**
> **What Claude did:** Labelled the phone-upgrade suggestion "Swap" even when the order had no phone in it yet.
>
> **What I changed:** It now says "Add" when there's nothing to replace, and "Swap" only when a phone is already in the order.
>
> **Why:** A button label should say exactly what will happen. "Swap" with nothing to swap makes the associate hesitate or tap just to find out.


**4. Product images**
> **What Claude did:** Used plain grey placeholder squares for every product image.
>
> **What I changed:** Considered pulling real photos from a retailer site like Best Buy, then chose simple drawn illustrations of each phone and accessory instead.
>
> **Why:** Retailer photos are copyrighted and their terms forbid scraping, which is riskier in a public portfolio repo. Drawings stay consistent and live in the project, so they can't break.
>
> **Trade-off:** Not photoreal, which is ok for a concept. Also, real images could always be swapped in later when available.

**5. Privacy at the counter**
> **What Claude did:** Showed "Uses 95% of their data" in bold as the reason for a plan upgrade.
>
> **What I changed:** Softened it to "Often close to their data limit" in regular weight.
>
> **Why:** The customer can usually see the tablet. Exact usage in bold can feel like being watched, especially with other people nearby.
>
> **Trade-off:** Less precise information for the associate. They can still open the customer's plan details if they need the number.

**6. Speed over model data**
> **What Claude did:** Proposed that "Not relevant" open a short form asking why (price, already owns it, not interested).
>
> **What I changed:** Made it a single tap with a quiet confirmation, and no form.
>
> **Why:** The associate is mid-sale with a customer waiting. Any extra step will be skipped, or will make them stop using the control.
>
> **Trade-off:** The model learns less from each tap. In a real product I'd explore getting the "why" from other signals, like what the customer bought instead, and test whether associates would ever answer a one-tap reason picker.
