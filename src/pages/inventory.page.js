const BasePage = require('./base.page');

class InventoryPage extends BasePage {

    get dropDown() {
        return $("//select[@class='product_sort_container']");
    }

    get addBackpack() {
        return $("//button[@id='add-to-cart-sauce-labs-backpack']");
    }

    get addBikeLight() {
        return $("//button[@id='add-to-cart-sauce-labs-bike-light']");
    }

    get removeBike(){
        return $("//button[@id='remove-sauce-labs-bike-light']");
    }

    get cartBadge() {
        return $("//span[@class='shopping_cart_badge']");
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

    async addTwoItemsToCart() {
        await this.addBackpack.waitForDisplayed();
        await this.addBackpack.click();
        await this.addBikeLight.waitForDisplayed();
        await this.addBikeLight.click();
    }

     async removeOneItemFromCart() {
        await this.removeBike.waitForDisplayed();
        await this.removeBike.click();
    }

    async getCartCount() {
        await this.cartBadge.waitForDisplayed({ timeout: 3000 });
        return await this.cartBadge.getText();
    }

    
 

}

module.exports = new InventoryPage();
