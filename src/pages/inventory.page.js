const BasePage = require('./base.page');

class InventoryPage extends BasePage {

    // Locator for the sort dropdown
    get dropDown() {
        return $("//select[@class='product_sort_container']");
    }

    // Method to select "Price (low to high)"
    async sortByPriceLowToHigh() {
        await this.dropDown.waitForDisplayed();           // wait until the dropdown is visible
        await this.dropDown.selectByVisibleText('Price (low to high)');
    }

}

module.exports = new InventoryPage();  // export instance for easy usage