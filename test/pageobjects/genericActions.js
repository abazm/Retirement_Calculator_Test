class GenericActions {

    doClick(element){
        element.waitForDisplayed()
        element.click()
    }

    async doSetValue(element, value){
        await element.waitForDisplayed()
        await element.click()
        await element.setValue(value)
    }

    doGetText(element){
        element.waitForDisplayed()
        return element.getText()
    }

    doIsDisplayed(element){
        element.waitForDisplayed()
        return element.isDisplayed()
    }

    doGetPageTitle(pageTitle){
        browser.waitUntil(function(){
            return (browser.getTitle() === pageTitle)
        }, 10000, 'title is not displayed after the given time'
    )
        return browser.getTitle()
    }

}

module.exports = new GenericActions()

