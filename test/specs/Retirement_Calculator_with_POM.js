const RetirementPage = require('../pageobjects/retirementPage')
const tData = require('../testData/constants');

const fs = require('fs')
let testData = JSON.parse(fs.readFileSync('test/testData/DataRepo.json'))


describe('POM - Retirement Calculator Automation Testing', async () => {

    beforeEach(async function () {

        //Setting up implicit timeout 
        await browser.setTimeout({ 'implicit': 10000 })

        //Open Pre-retirement calculator Securian web application
        await browser.url("/insights-tools/retirement-calculator.html")
        console.log("Navigating to Pre-retirement calculator Securian web application")
        await browser.maximizeWindow()
    })

    afterEach(async function () {
        // await browser.debug()
    })


    // Parameterized test data fetching from JSON file
    testData.forEach(({ current_age, retirement_age, current_income, spouse_income, current_total_savings,
        current_annual_savings, savings_increase_rate }) => {
        it('POM - Pre-retirement calculation Without SSN Benefits and Default Calculator', async () => {

            //Verify web application Title as expected            
            await RetirementPage.VerifyPageTitle(tData.LOGIN_PAGE_TITLE)

            await RetirementPage.Enter_currentage(current_age)
            await RetirementPage.Enter_retirementage(retirement_age)
            await RetirementPage.Enter_currentincome(current_income)
            await RetirementPage.Enter_spouseincome(spouse_income)

            await RetirementPage.Enter_currenttotalsavings(current_total_savings)
            await RetirementPage.Enter_currentannualsavings(current_annual_savings)

            await RetirementPage.Enter_savingsincreaserate(savings_increase_rate)

            await RetirementPage.Select_nosocialbenefit()

            await RetirementPage.Submit_Calculate()

            //Verifying Final Result Message assertion
            await RetirementPage.VerifyResultMessage(tData.RESULT_MESSAGE)
            await RetirementPage.TakeScreeshot("Final_Result_Message")

        })

    })
})
