const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('retirement_savings', function () {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function () {
    // await driver.quit();
  })
  it('retirement_savings', async function () {
    await driver.get("https://www.securian.com/insights-tools/retirement-calculator.html")
    await driver.manage().window().fullscreen()
    await driver.findElement(By.id("current-age")).sendKeys("40")
    await driver.findElement(By.id("retirement-age")).sendKeys("68")
    await driver.findElement(By.id("current-income")).click()
    await driver.findElement(By.id("current-income")).sendKeys("100000")
    await driver.findElement(By.id("spouse-income")).click()
    await driver.findElement(By.id("spouse-income")).sendKeys("75000")
    await driver.findElement(By.id("current-total-savings")).click()
    await driver.findElement(By.id("current-total-savings")).sendKeys("500000")
    await driver.findElement(By.id("current-annual-savings")).sendKeys("10")
    await driver.findElement(By.id("savings-increase-rate")).sendKeys("1")
    await driver.findElement(By.css("#include-social-container li:nth-child(1) > label")).click()
    let sta = await driver.findElement(By.css("#marital-status-ul > li:nth-child(2) > label"));
    await driver.wait(until.elementIsVisible(sta),5000);
    await driver.findElement(By.css("#marital-status-ul > li:nth-child(2) > label")).click()
    await driver.findElement(By.id("social-security-override")).sendKeys("4000")
    await driver.findElement(By.linkText("Adjust default values")).click()
    await driver.findElement(By.id("additional-income")).sendKeys("500")
    await driver.findElement(By.id("retirement-duration")).sendKeys("20")
    await driver.findElement(By.css("#include-inflation-container li:nth-child(1) > label")).click()
    let exprate = await driver.findElement(By.id("expected-inflation-rate"));
    await driver.wait(until.elementIsVisible(exprate),5000);
    await driver.findElement(By.id("expected-inflation-rate")).sendKeys("")
    await driver.findElement(By.id("retirement-annual-income")).sendKeys("75")
    await driver.findElement(By.id("pre-retirement-roi")).sendKeys("8")
    await driver.findElement(By.id("post-retirement-roi")).sendKeys("5")
    await driver.findElement(By.css(".dsg-row-wrapper:nth-child(3) .col-sm-4 > .dsg-btn-primary")).click()
    let calc = await driver.findElement(By.css(".dsg-row-wrapper:nth-child(7) > .row .dsg-btn-primary"));
    await driver.wait(until.elementIsVisible(calc),5000);
    await driver.findElement(By.css(".dsg-row-wrapper:nth-child(7) > .row .dsg-btn-primary")).click()
    let res = await driver.findElement(By.id("result-message"));
    await driver.wait(until.elementIsVisible(res),5000);
    assert(await driver.findElement(By.id("result-message")).getText() == "Congratulations! You are exceeding your retirement goals. You are saving an extra $833 a month.")
  })
})

