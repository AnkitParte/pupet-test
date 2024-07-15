import puppeteer from "puppeteer-core"
import { FE_URL } from "../utils/constants.js"
import { waitForTimeout } from "../utils/functions.js"
;(async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: false,
    executablePath: "/opt/homebrew/bin/chromium",
    defaultViewport: null,
    ignoreHTTPSErrors: true,
    slowMo: 60
  })
  const page = await browser.newPage()

  console.log(FE_URL.Loc)
  await page.goto(FE_URL.Loc)

  // Wait for the input box to be available
  await page.waitForSelector("input#login-email")
  await page.click("input#login-email")
  await page.type("input#login-email", "kisame@test.com")

  // await page.waitForSelector("input#login-password")
  // await page.click("input#login-password")
  // await page.type("input#login-password", "kisame@test.com")

  //! in case if password is not auto-filled
  // await page.keyboard.down("Control") // or 'Command' on macOS
  // await page.keyboard.press('A')
  // await page.keyboard.up("Control") // or 'Command' on macOS
  // await page.keyboard.press("Backspace")
  // await page.type("input#login-email", "TempPassw0rd!")

  await page.waitForSelector("form") // Optionally wait for the form to be present
  await page.waitForSelector('form button[type="submit"]') // Replace with the actual selector for the submit button

  //pincodeState
  // Click the submit button
  await page.click('form button[type="submit"]')

  //? create insurance instant-quote form fill
  // console.log(await page.$("#make"))
  await page.waitForSelector("#instant-quote")
  //   waitForTimeout(1000)
  await page.waitForSelector("div#make")
  await page.click("div#make")

  await page.waitForSelector("#make .css-i97cuk-menu", { visible: true })
  await page.click("#make .css-i97cuk-menu")

  await page.waitForSelector("div#model")
  await page.click("div#model")

  await page.waitForSelector("#model .css-i97cuk-menu", { visible: true })
  await page.click("#model .css-i97cuk-menu")

  await page.waitForSelector('select[name="variant"]', { visible: true })
  await page.click('select[name="variant"]')
  //   waitForTimeout(100)

  let variantOpt = await page.evaluate(() => {
    const variant = document.querySelector('select[name="variant"]')
    // console.log("variant", variant)
    let options = () => {
      for (const option of variant.childNodes) {
        console.log("option", option)
        if (option.value) {
          option.selected = "selected"
          return option.getAttribute("value")
        }
      }
    }
    // console.log(options())
    return options()
  })
  //   console.log("variantOpt", variantOpt)
  await page.select('select[name="variant"]', variantOpt)
  //   waitForTimeout(100)

  //? no need if date is auto-selected
  await page.waitForSelector('input[name="riskStartDate"]', { visible: true })
  await page.click('input[name="riskStartDate"]')
  await page.keyboard.press("Enter")
  //   waitForTimeout(100)

  await page.waitForSelector('input[name="registrationDate"]', { visible: true })
  await page.click('input[name="registrationDate"]')
  await page.type('input[name="registrationDate"]', "10-07-2024")
  //   waitForTimeout(100)

  //? customer type auto-selected
  await page.waitForSelector('select[name="customerType"]', { visible: true })
  await page.click('select[name="customerType"]')
  //   waitForTimeout(100)

  let customerTypeOpt = await page.evaluate(() => {
    const variant = document.querySelector('select[name="customerType"]')
    // console.log("customerType", variant)
    let options = () => {
      for (const option of variant.childNodes) {
        console.log("option", option)
        if (option.value) {
          option.selected = "selected"
          return option.getAttribute("value")
        }
      }
    }
    // console.log(options())
    return options()
  })
  //   console.log("customerTypeOpt", customerTypeOpt)
  await page.select('select[name="customerType"]', customerTypeOpt)
  //   waitForTimeout(100)

  await page.waitForSelector('input[name="pincode"]')
  await page.click('input[name="pincode"]')
  await page.type('input[name="pincode"]', "122001")
  //   waitForTimeout(100)

  //   await page.waitForSelector('input[name="idv"]')
  //   await page.click('input[name="idv"]')
  //   await page.type('input[name="idv"]', "50000")

  //   await page.waitForSelector('input[name="idv"]')
  //   await page.click('input[name="idv"]')

  //   await page.keyboard.down("command") // or 'Command' on macOS
  //   await page.keyboard.press("a")
  //   await page.keyboard.up("command") // or 'Command' on macOS
  //   await page.keyboard.press("delete")

  //   await page.type('input[name="idv"]', "50000")

  //   console.log(await page.$('form button[type="submit"]'))
  await page.waitForSelector('form button[type="submit"]') // Replace with the actual selector for the submit button
  //   waitForTimeout(100)
  await page.click('form button[type="submit"]')

  //   await page.focus('select[name="variant"]')
  //   waitForTimeout(100)
  //   await page.keyboard.press("ArrowDown")
  //   waitForTimeout(100)
  //   await page.keyboard.press("ArrowDown")
  //   waitForTimeout(100)
  //   await page.keyboard.press("Enter")
  //   await page.click()

  // await page.select("div#make", await page.$eval("div#make option", (option) => option.value))

  // await page.waitForSelector("div#instant-quote")
  // await page.waitForSelector('input[name="pincode"]')
  // await page.click('input[name="pincode"]')
  // await page.type('input[name="pincode"]', "122001")

  // await browser.close();
})()
