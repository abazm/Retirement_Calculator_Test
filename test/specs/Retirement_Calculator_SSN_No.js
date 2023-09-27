const fs = require('fs')
let testData = JSON.parse(fs.readFileSync('test/testData/DataRepo.json'))


describe('Retirement Calculator Automation Testing', async () => {

    beforeEach(async function () {

        //Setting up implicit timeout 
        await browser.setTimeout({ 'implicit': 10000 })

        //Open Pre-retirement calculator Securian web application
        await browser.url("/insights-tools/retirement-calculator.html")
        console.log("Navigating to Pre-retirement calculator Securian web application")
        await browser.maximizeWindow()
        console.log(await browser.getTitle())
    })

    afterEach(async function () {
        // await browser.debug()
    })


    // Parameterized test data fetching from JSON file
    testData.forEach(({ current_age, retirement_age, current_income, spouse_income, current_total_savings,
        current_annual_savings, savings_increase_rate }) => {
        it('Pre-retirement calculation Without SSN Benefits and Default Calculator', async () => {
            
            //Verify web application Title as expected
            await expect(browser).toHaveTitleContaining("How Much to Save for Retirement | Securian Financial")
            
            await $("#current-age").setValue(current_age)
            await $("#retirement-age").setValue(retirement_age)
            await $("#current-income").click()
            await $("#current-income").setValue(current_income)
            await $("#spouse-income").click()
            await $("#spouse-income").setValue(spouse_income)
            await $("#current-total-savings").click()
            await $("#current-total-savings").setValue(current_total_savings)
            await $("#current-annual-savings").setValue(current_annual_savings)
            await $("#savings-increase-rate").setValue(savings_increase_rate)
            await $("//label[@for='no-social-benefits']").waitForDisplayed()
            await $("//label[@for='no-social-benefits']").click()
            await $("//button[normalize-space()='Calculate']").waitForDisplayed()
            await $("//button[normalize-space()='Calculate']").click()
           
            //Wait until Result message displayed
            let resmsg = await $("//p[@id='result-message']")
            await resmsg.waitForDisplayed()
            console.log(await $("//p[@id='result-message']").getText())
            await browser.saveScreenshot("screenshots/TC2/Result_Message.png")
            await expect($("#result-message")).toHaveTextContaining("In order to retire by 68, you might need to consider increasing your monthly savings by $150 a month.")
        })

    })
})
