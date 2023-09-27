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


    //Parameterized test data fetching from JSON file
    testData.forEach(({ current_age, retirement_age, current_income, spouse_income, current_total_savings,
        current_annual_savings, savings_increase_rate, social_security_override, additional_income, retirement_duration, retirement_annual_income, pre_retirement_roi, post_retirement_roi }) => {
        it('Pre-retirement calculation With SSN Benefits and Default Calculator', async () => {
            
            //Verify web application Title as expected
            await expect(browser).toHaveTitleContaining("How Much to Save for Retirement | Securian Financial")
            await browser.saveScreenshot("screenshots/TC1/MainPage.png")

            //Filling the required fields in the retirement calc form
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
            await $("//label[@for='yes-social-benefits']").waitForDisplayed()
            await $("//label[@for='yes-social-benefits']").click()
            await $("//label[@for='married']").click()
            await $("#social-security-override").setValue(social_security_override)

            //Open Default Calculator Value
            await $("//a[normalize-space()='Adjust default values']").click()
            await browser.saveScreenshot("screenshots/TC1/Default_Calculator.png")

            await $("//h1[@id='default-values-modal-title']").waitForExist()
            await $("#additional-income").click()
            await $("#additional-income").setValue(additional_income)
            await $("#retirement-duration").setValue(retirement_duration)
            await $("//label[@for='exclude-inflation']").click()
            await $("#retirement-annual-income").click()
            await $("#retirement-annual-income").setValue(retirement_annual_income)
            await $("#pre-retirement-roi").setValue(pre_retirement_roi)
            await $("#post-retirement-roi").setValue(post_retirement_roi)
            await $("//button[normalize-space()='Save changes']").click()
            // await browser.pause("5000")
            await $("//button[normalize-space()='Calculate']").waitForDisplayed()
            await $("//button[normalize-space()='Calculate']").click()
            
            //wait until Result message displayed
            let resmsg = await $("//p[@id='result-message']")
            await resmsg.waitForDisplayed()
            console.log(await $("//p[@id='result-message']").getText())
            await browser.saveScreenshot("screenshots/TC1/Result_Message.png")
            await expect($("#result-message")).toHaveTextContaining("Congratulations! You are exceeding your retirement goals. You are saving an extra $833 a month.")
        })

    })
})