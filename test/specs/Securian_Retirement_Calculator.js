import RetirementPage from '../pageObjects/retirementPage.js'
import tData from '../testData/constants.js'
import fs from 'fs'

let testData1 = JSON.parse(fs.readFileSync('test/testData/DataRepo1.json'))
let testData2 = JSON.parse(fs.readFileSync('test/testData/DataRepo2.json'))

describe('Tesiting of Securian Retirement Calculator Business Flows', async () => {

    beforeEach(async function () {

        //Launching Securian Retirement Web Application 
        await RetirementPage.LaunchSecurianApps()

        //Verifying the Web Page Title post login
        await RetirementPage.VerifyPageTitle("How Much to Save for Retirement | Securian Financial")

    })

    after(async function () {
        // await browser.debug()
    })

    //Parameterized test data fetching from JSON file
    testData1.forEach(({ current_age, retirement_age, current_income, spouse_income, current_total_savings,
        current_annual_savings, savings_increase_rate, social_security_override, additional_income, retirement_duration, retirement_annual_income, pre_retirement_roi, post_retirement_roi }) => {
        //Test Case - 1
        it('Pre-retirement calculation With SSN Benefits, Married and NO default calc', async () => {

            //Filling the required fields in the retirement calc form
            await RetirementPage.Enter_CurrentAge(current_age)
            await RetirementPage.Enter_RetirementAge(retirement_age)
            await RetirementPage.Enter_CurrentIncome(current_income)

            await RetirementPage.Enter_SpouseIncome(spouse_income)
            await RetirementPage.Enter_CurrentTotalSavings(current_total_savings)
            await RetirementPage.Enter_CurrentAnnualSavings(current_annual_savings)
            await RetirementPage.Enter_SavingsIncreaseRate(savings_increase_rate)
            await RetirementPage.Select_Yes_SocialBenefit()
            await RetirementPage.Select_Married()
            await RetirementPage.Enter_SSNOverride(social_security_override)
            await RetirementPage.Submit_Calculate()
            await RetirementPage.TakeScreenshot("screenshots/TC1/Result_Page.png")
            //wait until Result message displayed
            await RetirementPage.VerifyResultMessage(tData.RESULT_MESSAGE_833)

        })

        // Parameterized test data fetching from JSON file
        testData1.forEach(({ current_age, retirement_age, current_income, spouse_income, current_total_savings,
            current_annual_savings, savings_increase_rate }) => {
            //Test Case - 2
            it('Pre-retirement New calculation With Default Calculator, EditInfo, NO SSN and No Marital Status', async () => {
                //Filling the required fields in the retirement calc form
                await RetirementPage.Enter_CurrentAge(current_age)
                await RetirementPage.Enter_RetirementAge(retirement_age)
                await RetirementPage.Enter_CurrentIncome(current_income)

                await RetirementPage.Enter_SpouseIncome(spouse_income)
                await RetirementPage.Enter_CurrentTotalSavings(current_total_savings)
                await RetirementPage.Enter_CurrentAnnualSavings(current_annual_savings)
                await RetirementPage.Enter_SavingsIncreaseRate(savings_increase_rate)
                await RetirementPage.Select_NO_SocialBenefit()
                await RetirementPage.Submit_Calculate()
                await RetirementPage.TakeScreenshot("screenshots/TC2/Result_Page1.png")
                await RetirementPage.VerifyResultMessage(tData.RESULT_MESSAGE_150)

                //Open Default Calculator Value
                await RetirementPage.Click_EditInfo()
                await RetirementPage.Click_AdjDefaultValues()

                //Wait for Default Calculator
                try {
                    if (await RetirementPage.WaitforDisplay_DefaultCalc()) {
                    }
                } catch (error) {
                    console.log('Default Calc Page is not displayed')
                }

                await RetirementPage.Enter_AdditionalIncome(additional_income)
                await RetirementPage.Enter_RetirementDuration(retirement_duration)
                await RetirementPage.Select_ExcludeInflation()
                await RetirementPage.Enter_RetirementAnnualIncome(retirement_annual_income)
                await RetirementPage.Enter_PreRetirementROI(pre_retirement_roi)
                await RetirementPage.Enter_PostRetirementROI(post_retirement_roi)
                await RetirementPage.Click_SaveChanges()
                await RetirementPage.Submit_Calculate()

                //wait until Result message displayed
                // await RetirementPage.VerifyResultMessage(tData.RESULT_MESSAGE_833)
                await RetirementPage.TakeScreenshot("screenshots/TC2/Result_Page2.png")

            })

            // Parameterized test data fetching from JSON file
            testData2.forEach(({ current_age, retirement_age, current_income, spouse_income, current_total_savings,
                current_annual_savings, savings_increase_rate }) => {
                //Test Case - 3
                it('New Dataset- Pre-retirement calculation With SSN Benefits, NO SSN Overide and Single', async () => {

                    //Verify web application Title as expected
                    await expect(browser).toHaveTitleContaining("How Much to Save for Retirement | Securian Financial")

                    await RetirementPage.Enter_CurrentAge(current_age)
                    await RetirementPage.Enter_RetirementAge(retirement_age)
                    await RetirementPage.Enter_CurrentIncome(current_income)
                    await RetirementPage.Enter_SpouseIncome(spouse_income)
                    await RetirementPage.Enter_CurrentTotalSavings(current_total_savings)
                    await RetirementPage.Enter_CurrentAnnualSavings(current_annual_savings)
                    await RetirementPage.Enter_SavingsIncreaseRate(savings_increase_rate)
                    await RetirementPage.Select_Yes_SocialBenefit()
                    await RetirementPage.Select_Single()
                    await RetirementPage.Submit_Calculate()
                    await RetirementPage.TakeScreenshot("screenshots/TC3/Result_Page1.png")
                    await RetirementPage.VerifyResultMessage(tData.RESULT_MESSAGE_5511)
                })


                //Parameterized test data fetching from JSON file
                testData1.forEach(({ current_age, retirement_age, current_income, spouse_income, current_total_savings,
                    current_annual_savings, savings_increase_rate }) => {
                    //Test Case - 4
                    it('Pre-retirement calculation - Verifying error messages when user filling boundry value conditions', async () => {

                        //Verification of Age boundry level upto 120 and above  
                        await RetirementPage.Enter_CurrentAge("130")
                        await RetirementPage.Enter_RetirementAge("120")
                        await RetirementPage.Enter_CurrentIncome(current_income)
                        await RetirementPage.Enter_SpouseIncome(spouse_income)
                        await RetirementPage.Enter_CurrentTotalSavings(current_total_savings)
                        await RetirementPage.Enter_CurrentAnnualSavings(current_annual_savings)
                        await RetirementPage.Enter_SavingsIncreaseRate(savings_increase_rate)

                        await RetirementPage.Submit_Calculate()


                        //Verifying If error message thrown while blank fields are entered 
                        await RetirementPage.VerifyErrorMessage($("//p[@id='calculator-input-alert-desc']"), "Please fill out all required fields")

                        //Verifying age boundry error message 
                        await $("//span[@id='invalid-current-age-error']").waitForDisplayed()
                        // console.log(await $("//span[@id='invalid-current-age-error']").getText())
                        await expect($("//span[@id='invalid-current-age-error']")).toHaveTextContaining("Age cannot be greater than 120")

                        await RetirementPage.TakeScreenshot("screenshots/TC4/Error_Message1.png")


                        //Verify Invalid planned retirement age boundry
                        await RetirementPage.Enter_CurrentAge("0") //Verify error if Current Age = 0
                        await RetirementPage.Submit_Calculate()
                        await RetirementPage.VerifyErrorMessage($("//span[@id='invalid-current-age-error']"), "Age cannot be 0")
                        await RetirementPage.TakeScreenshot("screenshots/TC4/Error_Message2.png")

                        await RetirementPage.Enter_CurrentAge("120")
                        await RetirementPage.Enter_RetirementAge("68")
                        await RetirementPage.Submit_Calculate()

                        await expect($("//span[@id='invalid-retirement-age-error']")).toHaveTextContaining("Planned retirement age must be greater than current age")

                        await RetirementPage.TakeScreenshot("screenshots/TC4/Error_Message3.png")
                    })

                })

            })
        })
    })
})