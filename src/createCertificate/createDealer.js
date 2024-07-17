import puppeteer from "puppeteer"
import { FE_URL } from "../utils/constants.js"
import { waitForTimeout } from "../utils/functions.js"
;(async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: false,
    slowMo: 60,
    ignoreHTTPSErrors: true,
    defaultViewport: null
  })
  const page = await browser.newPage()

  // Navigate to the login page
  await page.goto(FE_URL.ops)
  console.log("Successfully went through the url")

  // Wait for the email input field to be visible
  await page.waitForSelector('input[type="email"]', {
    visible: true,
    timeout: 6000
  })

  // Clear and type the email address
  await page.evaluate(
    () => (document.querySelector('input[type="email"]').value = "")
  )
  await page.type('input[type="email"]', "arpita@aegiscovenant.com")

  // Clear and type the password
  await page.evaluate(
    () => (document.querySelector('input[type="password"]').value = "")
  )
  await page.type('input[type="password"]', "Arpita828!")

  // Wait for the "Sign in" button to be visible
  await page.waitForSelector('button[type="submit"]', {
    visible: true,
    timeout: 6000
  })
  // Click the "Sign in" button
  await page.click('button[type="submit"]')
  console.log("Successfully logged in!")

  // Add a delay to allow for any post-login processes
  await new Promise((resolve) => setTimeout(resolve, 5000))

  // Wait for the Top-Up element using XPath
  const dealerCreation = '//*[@id="root"]/div[1]/div[1]/div[3]/ul/li[3]/a/span'
  const element = await page.waitForSelector(`xpath/${dealerCreation}`)
  await element.click()
  console.log("Clicked on Create Dealer")
  {
    // Fill name
    await page.waitForSelector('input[name="name"]')
    await page.click('input[name="name"]')
    await page.type('input[name="name"]', " Test Master Dealer ")
    console.log("Name Added Successfully!")

    // Fill Legal Name
    await page.waitForSelector('input[name="legalName"]')
    await page.click('input[name="legalName"]')
    await page.type('input[name="legalName"]', "Test Master Dealer")
    console.log("Legal Name Added Successfully!")

    // Fill Email
    await page.waitForSelector('input[name="email"]')
    await page.click('input[name="email"]')
    await page.type('input[name="email"]', "masterdealer@test.com")
    console.log("Email Added Successfully!")

    // Fill Mobile No.
    await page.waitForSelector('input[name="mobile"]', { visible: true })
    await page.click('input[name="mobile"]')
    await page.type('input[name="mobile"]', "9999999999")
    console.log("Mobile No. Added Successfully!")

    // Select Distributor
    await page.waitForSelector('select[name="distributorId"]', {
      visible: true
    })
    await page.click('select[name="distributorId"]')
    //   waitForTimeout(100)

    let distributorIdOpt = await page.evaluate(() => {
      const distributorId = document.querySelector(
        'select[name="distributorId"]'
      )
      console.log("distributorId dom", distributorId)
      let options = () => {
        for (const option of distributorId.childNodes) {
          console.log("option dom", option)
          if (option.value) {
            option.selected = "selected"
            return option.getAttribute("value")
          }
        }
      }
      // console.log(options())
      return options()
    })
    await page.select('select[name="distributorId"]', distributorIdOpt)
    console.log("Distributor selected successfully!")
  }

  // Click on the RTO input field and type the search query
  await page.waitForSelector("#rtoId .css-19bb58m", { visible: true })
  await page.click("#rtoId .css-19bb58m")

  await page.type("#rtoId .css-19bb58m", "DL")
  console.log("successfully searched.....")

  await page.waitForSelector("#rtoId .css-ola5lb-menu", { visible: true })
  waitForTimeout(3000)

  // let rtoId = await page.evaluate(() => {
  //   const rtoList = document.querySelector(".css-ola5lb-menu")
  //   console.log("rtoList", rtoList)
  //   return rtoList
  // })
  await page.waitForSelector(".css-lakovd-option")
  await page.click(".css-lakovd-option")

  console.log("element found sucessfully !")

  await page.waitForSelector('input[name="pincode"]')
  await page.click('input[name="pincode"]')
  await page.type('input[name="pincode"]', "122001")
  console.log("Pincode Added Successfully!")

  // Search RTO
  // Wait for the RTO input field

  // Add a delay to allow for any post-login processes
  await new Promise((resolve) => setTimeout(resolve, 5000))

  // await browser.close()
  console.log("Browser closed")
})()
