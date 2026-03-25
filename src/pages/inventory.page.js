const BasePage = require('./base.page');

class InventoryPage extends BasePage {

    get dropDown() {
        return $("//select[@class='product_sort_container']");
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

}

module.exports = new InventoryPage();
