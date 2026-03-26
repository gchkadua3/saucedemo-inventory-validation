const LoginPage = require('../pages/login.page');
const InventoryPage = require('../pages/inventory.page');

const items = ['sauce-labs-backpack', 'sauce-labs-bike-light'];

describe('UC-1: Sorting Validation', () => {

    before(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
    });

    it('should sort items low to high and verify prices', async () => {
        await InventoryPage.sortByPriceLowToHigh();

        const prices = await InventoryPage.getItemPrices();
        console.log('DEBUG: Scraped prices:', prices);

        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sorted);
    });

    it('should add two items to the cart and verify cart updates to 2', async () => {
        await InventoryPage.addItemsToCart(items);

        const count = await InventoryPage.getCartCount();
        console.log('DEBUG: Cart count:', count);

        expect(count).toBe('2');
    });

    it('should remove one item and verify cart updates to 1', async () => {
        await InventoryPage.removeItemsFromCart([items[1]]);

        const count = await InventoryPage.getCartCount();
        console.log('DEBUG: Cart count after remove:', count);

        expect(count).toBe('1');
    });

});