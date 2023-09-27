describe('Ecommerce Application', async () => {


    it('Login Fail page title-Smoke', async () => {
        //webdriverio Async  (Sync)

        await browser.url("/loginpagePractise/")
        console.log(await browser.getTitle())
        await expect(browser).toHaveTitleContaining("Rahul Shetty Academy")
        //Css Selector, Xpath
        await $("input[name='username']").setValue("rahulshettyacademy")
        await $("#username").setValue("secondCSS")
        const password = $("//input[@type='password']")
        await password.setValue("learning")
        await $("#signInBtn").click()
        await console.log(await $(".alert-danger").getText())
        await browser.waitUntil(async () => await $("#signInBtn").getAttribute('value') === 'Sign In',
            {
                timeout: 5000,
                timeoutMsg: 'Error message is not showing up'
            })
        await console.log(await $(".alert-danger").getText())
        await expect($("p")).toHaveTextContaining("username is rahulshettyacademy and Password is learning")

    })

    it('Login Fail page title Smoke', async () => {
        await browser.url("/loginpagePractise/")
        console.log(await browser.getTitle())

        await expect(browser).toHaveTitleContaining("Rahul Shetty Academy")

    })


    it('Login Success page title', async () => {
        browser.url("/loginpagePractise/")
        await $("input[name='username']").setValue("rahulshettyacademy")
        const password = $("//input[@type='password']")
        await password.setValue("learning")
        await $("#signInBtn").click()
        //wait until checkout button is displayed
        await $(".btn-primary").waitForExist()
        await expect(browser).toHaveUrlContaining("shop")
        await expect(browser).toHaveTitle("ProtoCommerce")
        await browser.saveScreenshot("Login_Success.png")




    })


















})