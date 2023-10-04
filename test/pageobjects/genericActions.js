class GenericActions {

   async doClick(element){
       await element.waitForDisplayed()
       await element.click()
    }

    async doSetValue(element, value){
         await element.waitForDisplayed()
         await element.click()
         await element.setValue(value)
    }

    async doGetText(element){
        await element.waitForDisplayed()
        return element.getText()
    }

    async doIsDisplayed(element){
        await element.waitForDisplayed()
        return element.isDisplayed()
    }

    async doGetPageTitle(pageTitle){
        await browser.waitUntil(function(){
            return (browser.getTitle() === pageTitle)
        }, 10000, 'title is not displayed after the given time'
    )
        return browser.getTitle()
    }

}

export default new GenericActions()

