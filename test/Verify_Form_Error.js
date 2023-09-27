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


    testData.forEach(({ current_age, retirement_age, current_income, spouse_income, current_total_savings,
        current_annual_savings, savings_increase_rate }) => {
        it('Pre-retirement calculation - Verifying error messages when user filling boundry value conditions', async () => {

            //Verification of Age boundry level upto 120 and above   
            await $("#current-age").setValue("130")
            await $("#retirement-age").setValue("120")

            await $("#current-income").click()
            await $("#current-income").setValue(current_income)
            await $("#spouse-income").click()
            await $("#spouse-income").setValue(spouse_income)
            await $("#current-total-savings").click()
            await $("#current-total-savings").setValue(current_total_savings)
            await $("#current-annual-savings").setValue(current_annual_savings)
            await $("#savings-increase-rate").setValue(savings_increase_rate)
            await $("//button[normalize-space()='Calculate']").waitForDisplayed()
            await $("//button[normalize-space()='Calculate']").click()
            await browser.pause("3000")

            //Verifying If error message thrown while blank fields are entered 
            console.log(await $("//p[@id='calculator-input-alert-desc']").getText())
            await expect($("//p[@id='calculator-input-alert-desc']")).toHaveTextContaining("Please fill out all required fields")

            //Verifying age boundry error message 
            await $("//span[@id='invalid-current-age-error']").waitForDisplayed()
            console.log(await $("//span[@id='invalid-current-age-error']").getText())
            await expect($("//span[@id='invalid-current-age-error']")).toHaveTextContaining("Age cannot be greater than 120")
            await browser.saveScreenshot("screenshots/TC3/Error_Message1.png")

            //Verify Invalid planned retirement age boundry
            await $("#current-age").setValue("50")
            await $("#retirement-age").setValue("40")
            await $("//button[normalize-space()='Calculate']").click()

            console.log(await $("//span[@id='invalid-retirement-age-error']").getText())
            await expect($("//span[@id='invalid-retirement-age-error']")).toHaveTextContaining("Planned retirement age must be greater than current age")
            await browser.saveScreenshot("screenshots/TC3/Error_Message2.png")


        })

    })
})

