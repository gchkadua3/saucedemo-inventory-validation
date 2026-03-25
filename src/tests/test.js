const LoginPage = require('../pages/login.page');
const InventoryPage = require('../pages/inventory.page');

describe('Login Test', () => {

    before(async () => {

        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

    });
    

    it('should sort items low to high', async () => {

        await InventoryPage.sortByPriceLowToHigh();

    });


});

