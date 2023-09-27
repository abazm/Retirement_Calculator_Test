const expectchai = require('chai').expect

describe('UI Controls Test Suite',async()=>
{

xit('UI Controls sanity',async()=>
{
    await browser.url("/loginpagePractise/#")
    await $("input[name='username']").setValue("rahulshettyacademy")
    const password = $("//input[@type='password']")
    await password.setValue("learning")
    //what if multiple elements $$
    const radioButtons = await $$(".customradio")
    const userDropdown = radioButtons[1]
    await userDropdown.$("span").click() //chaining locators-
    const modal =await $(".modal-body")
    await modal.waitForDisplayed()
    await $("#cancelBtn").click()
    console.log(await $$(".customradio")[0].$("span").isSelected())
    await userDropdown.$("span").click()
    await modal.waitForDisplayed()
    await $("#okayBtn").click();
    //validate pop up not shown up when you select admin
    await $$(".customradio")[0].$("span").click()
    await expect(modal).not.toBeDisplayed()
    const dropdown = await $("select.form-control") //select tag
    await dropdown.selectByAttribute('value','teach')
    await dropdown.selectByVisibleText("Consultant")
    await dropdown.selectByIndex(0)
    console.log(await dropdown.getValue())
    expectchai(await dropdown.getValue()).to.equal("stud")
})
    xit('Dynamic Dropdown Controls Smoke',async()=>

    {
        await browser.url("/AutomationPractice/")
        await  $("#autocomplete").setValue("ind")
        await  browser.pause(3000)
        let items = await $$("[class='ui-menu-item'] div")
        for(var i =0;i<await items.length;i++)
        {
            if(await items[i].getText() === "India")
            {
                await items[i].click()
                //await browser.pause(3000)
            }
 
        }

 
 })

 it('Checkboxes Identification', async() => {
    await browser.url("/AutomationPractice/")
  const element = await $$("input[type='checkbox']")
   await element[1].click()
  console.log(await element[1].isSelected())
  console.log(await element[2].isSelected())
  await browser.saveScreenshot("screenshot.png")



  
 
 
 
 })



})







