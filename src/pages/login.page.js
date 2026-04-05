const BasePage = require('./base.page');

class LoginPage extends BasePage {

    open() {
        return super.open('/');
    }    

    get userNameInput(){
        return $("//input[@id='user-name']");
    }

    get passwordInput(){
        return $("//input[@id='password']");
    }

    get loginButton(){
        return $("//input[@id='login-button']");
    }
    
    async login(username,password){
        await this.userNameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();

    }
}

module.exports = new LoginPage();