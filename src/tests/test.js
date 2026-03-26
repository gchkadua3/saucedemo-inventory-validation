const LoginPage = require('../pages/login.page');
const InventoryPage = require('../pages/inventory.page');

const items = ['sauce-labs-backpack', 'sauce-labs-bike-light'];

describe('Inventory Page: Sorting & Cart State Validation (UC-1 & UC-2)', () => {

    before(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
    });

    it('user is on inventory page WHEN sorted by price low to high THEN prices should be in ascending order', async () => {
        await InventoryPage.sortByPriceLowToHigh();

        const prices = await InventoryPage.getItemPrices();
        

        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sorted);
    });

    it('inventory page WHEN two items are added to cart THEN cart badge should display 2', async () => {
        await InventoryPage.addItemsToCart(items);

        const count = await InventoryPage.getCartCount();

        expect(count).toBe('2');
    });

    it('cart has two items WHEN one item is removed THEN cart badge should display 1', async () => {
        await InventoryPage.removeItemsFromCart([items[1]]);

        const count = await InventoryPage.getCartCount();

        expect(count).toBe('1');
    });

});