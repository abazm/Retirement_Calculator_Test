import GenericActions from './genericActions.js'

class RetirementPage {

    // Defining Securian Retirement webpage Locators/Selectors
    get CurrentAge() {
        return $("#current-age")
    }

    get RetirementAge() {
        return $("#retirement-age")
    }

    get CurrentIncome() {
        return $("#current-income")
    }

    get SpouseIncome() {
        return $("#spouse-income")
    }

    get CurrentTotalSavings() {
        return $("#current-total-savings")
    }

    get CurrentAnnualSavings() {
        return $("#current-annual-savings")
    }

    get SavingsIncreaseRate() {
        return $("#savings-increase-rate")
    }

    get Married() {
        return $("//label[@for='married']")
    }

    get Single() {
        return $("//label[@for='single']")
    }

    get SSNOverride() {
        return $("#social-security-override")
    }

    get EditInfo() {
        return $("//button[contains(text(),'Edit')]")
    }

    get AdjDefaultValues() {
        return $("//a[normalize-space()='Adjust default values']")
    }

    get RetirementDuration() {
        return $("#retirement-duration")
    }

    get AdditionalIncome() {
        return $("#additional-income")
    }

    get RetirementAnnualIncome() {
        return $("#retirement-annual-income")

    }

    get PreRetirementROI() {
        return $("#pre-retirement-roi")

    }

    get PostRetirementROI() {
        return $("#post-retirement-roi")

    }

    get ExcludeInflation() {
        return $("//label[@for='exclude-inflation']")
    }

    get SaveChanges() {
        return $("//button[normalize-space()='Save changes']")

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

    get DefCalc() {
        return $("//h1[@id='default-values-modal-title']")
    }

    get ResultMessage() {
        return $("//p[@id='result-message']")
    }


    // Reusable wrapper functions/methods


    async Enter_CurrentAge(current_age) {
        await GenericActions.doSetValue(this.CurrentAge, current_age)
    }


    async Enter_RetirementAge(retirement_age) {
        await GenericActions.doSetValue(this.RetirementAge, retirement_age)
    }

    async Enter_CurrentIncome(current_income) {
        await GenericActions.doSetValue(this.CurrentIncome, current_income)
    }

    async Enter_SpouseIncome(spouse_income) {
        await GenericActions.doSetValue(this.SpouseIncome, spouse_income)

    }

    async Enter_CurrentTotalSavings(current_total_savings) {
        await GenericActions.doSetValue(this.CurrentTotalSavings, current_total_savings)

    }
    async Enter_CurrentAnnualSavings(current_annual_savings) {
        await GenericActions.doSetValue(this.CurrentAnnualSavings, current_annual_savings)

    }

    async Enter_SavingsIncreaseRate(savings_increase_rate) {
        await GenericActions.doSetValue(this.SavingsIncreaseRate, savings_increase_rate)

    }


    async Select_NO_SocialBenefit() {
        await GenericActions.doClick(this.NOSSN)

    }

    async Select_Yes_SocialBenefit() {
        await GenericActions.doClick(this.YESSSN)

    }

    async Select_ExcludeInflation() {
        await GenericActions.doClick(this.ExcludeInflation)

    }

    async Submit_Calculate() {
        await GenericActions.doClick(this.Calculate)

    }


    async Select_Married() {
        await GenericActions.doClick(this.Married)
    }


    async Select_Single() {
        await GenericActions.doClick(this.Single)
    }

    async Enter_SSNOverride(SSNOverride) {
        await GenericActions.doSetValue(this.SSNOverride, SSNOverride)
    }

    async Click_AdjDefaultValues() {
        await GenericActions.doClick(this.AdjDefaultValues)

    }

    async Click_SaveChanges() {
        await GenericActions.doClick(this.SaveChanges)

    }

    async Click_EditInfo() {
        await GenericActions.doClick(this.EditInfo)

    } 

    async Enter_RetirementDuration(RetirementDuration) {
        await GenericActions.doSetValue(this.RetirementDuration, RetirementDuration)

    }

    async Enter_AdditionalIncome(AdditionalIncome) {
        await GenericActions.doSetValue(this.AdditionalIncome, AdditionalIncome)

    }

    async Enter_RetirementAnnualIncome(RetirementAnnualIncome) {
        await GenericActions.doSetValue(this.RetirementAnnualIncome, RetirementAnnualIncome)

    }

    async Enter_PreRetirementROI(PreRetirementROI) {
        await GenericActions.doSetValue(this.PreRetirementROI, PreRetirementROI)

    }

    async Enter_PostRetirementROI(PostRetirementROI) {
        await GenericActions.doSetValue(this.PostRetirementROI, PostRetirementROI)


    }

    async isResultMessageDisplayed() {
        await GenericActions.doIsDisplayed(this.resultmessage)
    }

    async VerifyResultMessage(result_message) {
        console.log("Verifying Result Message")
        await browser.pause("3000")
        console.log(await this.ResultMessage.getText())
        await expect(this.ResultMessage).toHaveTextContaining(result_message)
    }

    async VerifyErrorMessage(Locator, Error_message) {
        await browser.pause("2000")
        // console.log(await Locator.getText())
        await expect(Locator).toHaveTextContaining(Error_message)
    }

    async TakeScreenshot(screenshotname) {
        await browser.pause("3000")
        console.log("Screenshot Captured")
        await browser.saveScreenshot(screenshotname)

    }

    async LaunchSecurianApps() {
        //Setting up implicit timeout 
        await browser.setTimeout({ 'implicit': 10000 })

        //Open Pre-retirement calculator Securian web application
        await browser.url("/insights-tools/retirement-calculator.html")
        console.log("Navigating to Pre-retirement calculator Securian web application")
        await browser.maximizeWindow()

    }

    async VerifyPageTitle(page_title) {
        await expect(browser).toHaveTitleContaining(page_title)
        await browser.saveScreenshot("screenshots/TC1/MainPage.png")
        console.log(browser.getTitle())

    }

    async WaitforDisplay_DefaultCalc() {
        await GenericActions.doIsDisplayed(this.DefCalc)

    }
}

export default new RetirementPage()