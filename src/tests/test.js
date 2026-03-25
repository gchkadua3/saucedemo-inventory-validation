const LoginPage = require('../pages/login.page');
const InventoryPage = require('../pages/inventory.page');

describe('UC-1: Sorting Validation', () => {

    before(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
    });

    it('should sort items low to high and verify prices', async () => {
        // Sort items
        await InventoryPage.sortByPriceLowToHigh();

        // Scrape prices
        const prices = await InventoryPage.getItemPrices();
        console.log('DEBUG: Scraped prices:', prices);

        // Validate ascending order
        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sorted);
    });

});