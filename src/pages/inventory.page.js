const BasePage = require('./base.page');

const items = ['sauce-labs-backpack', 'sauce-labs-bike-light'];

class InventoryPage extends BasePage {

    get dropDown() {
        return $("//select[@class='product_sort_container']");
    }

    get cartBadge() {
        return $("//span[@class='shopping_cart_badge']");
    }

    // 🔹 Dynamic selectors
    getAddButton(item) {
        return $(`//button[@data-test='add-to-cart-${item}']`);
    }

    getRemoveButton(item) {
        return $(`//button[@data-test='remove-${item}']`);
    }

    async sortByPriceLowToHigh() {
        await this.dropDown.waitForDisplayed();
        await this.dropDown.selectByVisibleText('Price (low to high)');
    }

    async getItemPrices() {
    const priceElements = Array.from(
        await browser.$$("//div[@class='inventory_item_price']")
    );
    const texts = await Promise.all(priceElements.map(el => el.getText()));
    return texts.map(text => parseFloat(text.replace('$', '')));
}

    // 🔹 Parametrized add
    async addItemsToCart(items) {
        for (const item of items) {
            const button = await this.getAddButton(item);
            await button.waitForDisplayed();
            await button.click();
        }
    }

    // 🔹 Parametrized remove
    async removeItemsFromCart(items) {
        for (const item of items) {
            const button = await this.getRemoveButton(item);
            await button.waitForDisplayed();
            await button.click();
        }
    }

    async getCartCount() {
        await this.cartBadge.waitForDisplayed({ timeout: 3000 });
        return await this.cartBadge.getText();
    }

}

module.exports = new InventoryPage();