const LoginPage = require('../pages/login.page');

describe('Login Test', () => {

    it('should login with valid credentials', async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
    });


});

