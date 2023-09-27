const loginPage = require('../pageobjects/loginPage')
const shopPage = require('../pageobjects/shop')
const reviewPage = require('../pageobjects/reviewpage')
const expectchai = require('chai').expect
const fs = require('fs')
let credentials = JSON.parse(fs.readFileSync('test/testData/LoginTest.json'))
let e2eCredentials = JSON.parse(fs.readFileSync('test/testData/e2eTest.json'))

describe('Ecommerce Application', async () => {

    credentials.forEach(({ username, password }) => {
        xit('Login Fail page', async () => {
            //webdriverio Async  (Sync)

            await browser.url("/loginpagePractise/#")
            console.log(await browser.getTitle())
            await expect(browser).toHaveTitleContaining("Rahul Shetty Academy")
            //Css Selector, Xpath
            await loginPage.Login(username, password)
            await console.log(await loginPage.alert.getText())
            await browser.waitUntil(async () => await loginPage.signIn.getAttribute('value') === 'Sign In',
                {
                    timeout: 5000,
                    timeoutMsg: 'Error message is not showing up'
                })
            await console.log(await loginPage.alert.getText())
            await expect(await loginPage.textInfo).toHaveTextContaining("username is rahulshettyacademy and Password is learning")

        })
    })


    e2eCredentials.forEach(({ products }) => {
        it('End to End Test', async () => {
            // const products = ['iphone X','Blackberry']
            await browser.url("/loginpagePractise/#")
            await loginPage.Login("rahulshettyacademy", "learning")
            await shopPage.checkout.waitForExist()  //link Text
            await shopPage.addProductToCart(products)
            await shopPage.checkout.click()
            sumOfProducts = await reviewPage.sumOfProducts()
            totalIntValue = await reviewPage.totalFormattedPrice()
            await expectchai(sumOfProducts).to.equal(totalIntValue)
            await $(".btn-success").click()
            await $("#country").setValue("ind")
            await $(".lds-ellipsis").waitForExist({ reverse: true })
            await $("=India").click()
            await $("input[type='submit']").click()
            await expect($(".alert-success")).toHaveTextContaining("Success")
        })

    })



















})