class InventoryPage extends BasePage {

    
    get dropDown() {
        return $("//select[@class='product_sort_container']");
    }

    async sortByPriceLowToHigh() {
        await this.dropDown.selectByVisibleText('Price (low to high)');
    }
}

module.exports = InventoryPage;