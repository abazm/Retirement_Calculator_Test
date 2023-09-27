const GenericActions = require('../pageobjects/genericActions')

class RetirementPage {

    // Defining Securian Retirement webpage Locators/Selectors
    get currentage() {
        return $("#current-age")
    }

    get retirementage() {
        return $("#retirement-age")
    }

    get currentincome() {
        return $("#current-income")
    }

    get spouseincome() {
        return $("#spouse-income")
    }

    get currenttotalsavings() {
        return $("#current-total-savings")
    }

    get currentannualsavings() {
        return $("#current-annual-savings")
    }

    get savingsincreaserate() {
        return $("#savings-increase-rate")
    }

    get NOSSN() {
        return $("//label[@for='no-social-benefits']")
    }

    get YESSSN() {
        return $("//label[@for='yes-social-benefits']")
    }

    get Calculate() {
        return $("//button[normalize-space()='Calculate']")
    }

    get resultmessage() {
        return $("//p[@id='result-message']")
    }


    // Reusable wrapper functions/methods
    async VerifyPageTitle(page_title) {
        console.log("Verifying Title Page")
        await expect(browser).toHaveTitleContaining(page_title)

    }



    async Enter_currentage(current_age) {
        await GenericActions.doSetValue(this.currentage, current_age)
    }


    async Enter_retirementage(retirement_age) {
        await GenericActions.doSetValue(this.retirementage, retirement_age)
    }

    async Enter_currentincome(current_income) {
        await GenericActions.doSetValue(this.currentincome, current_income)
    }

    async Enter_spouseincome(spouse_income) {
        await GenericActions.doSetValue(this.spouseincome, spouse_income)

    }

    async Enter_currenttotalsavings(current_total_savings) {
        await GenericActions.doSetValue(this.currenttotalsavings, current_total_savings)

    }
    async Enter_currentannualsavings(current_annual_savings) {
        await GenericActions.doSetValue(this.currentannualsavings, current_annual_savings)

    }

    async Enter_savingsincreaserate(savings_increase_rate) {
        await GenericActions.doSetValue(this.savingsincreaserate, savings_increase_rate)

    }


    async Select_nosocialbenefit() {
        await GenericActions.doClick(this.NOSSN)

    }

    async Submit_Calculate() {
        await GenericActions.doClick(this.Calculate)

    }

    async isResultMessageDisplayed() {
        await GenericActions.doIsDisplayed(this.resultmessage)
    }

    async VerifyResultMessage(result_message) {
        console.log("Verifying Result Message")
        await browser.pause("3000")
        await expect(this.resultmessage).toHaveTextContaining(result_message)

    }

    async TakeScreeshot(screenshotname) {
        await browser.pause("3000")
        console.log("Screenshot Captured")
        await browser.saveScreenshot("screenshots/POM_TC/" + screenshotname + ".png")

    }

}

module.exports = new RetirementPage()