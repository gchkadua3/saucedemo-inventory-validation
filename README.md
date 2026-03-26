### What is being tested?

The inventory page allows users to sort products by price. This test validates that when **"Price (low to high)"** is selected, the displayed prices are actually rendered in ascending order.

### How it works — step by step

**Step 1 — Select the sort option**
```javascript
await this.dropDown.waitForDisplayed();
await this.dropDown.selectByVisibleText('Price (low to high)');
```
The dropdown (`product_sort_container`) is located and the option is selected by its visible label.

**Step 2 — Scrape all prices from the DOM**
```javascript
const priceElements = Array.from(
    await browser.$$("//div[@class='inventory_item_price']")
);
const texts = await Promise.all(priceElements.map(el => el.getText()));
return texts.map(text => parseFloat(text.replace('$', '')));
```
- `browser.$$()` returns all matching price elements as a WebdriverIO collection.
- `Array.from()` converts it to a plain JavaScript array so `Promise.all` can iterate it.
- Each element's text (e.g. `"$9.99"`) is stripped of the `$` symbol and parsed to a float.
- Result: a plain number array like `[7.99, 9.99, 15.99, 29.99]`.

**Step 3 — Assert ascending order**
```javascript
const sorted = [...prices].sort((a, b) => a - b);
expect(prices).toEqual(sorted);
```
- A copy of the scraped array is sorted numerically from low to high.
- The original DOM order is compared against the expected sorted order.
- If the UI is rendering prices out of order, this assertion fails.

### Why `Array.from()` is required

`browser.$$()` in WebdriverIO returns a **lazy element collection**, not a native JavaScript array. Without `Array.from()`, calling `.map()` on it inside `Promise.all` throws:
```
TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator))
```

---
