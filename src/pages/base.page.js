class BasePage {

    open(url) {
        return browser.url(url);
    }

}

module.exports = BasePage;