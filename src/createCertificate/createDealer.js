import puppeteer from "puppeteer"
import { FE_URL } from "../utils/constants.js"
;(async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: false,
    slowMo: 60,
    ignoreHTTPSErrors: true,
    defaultViewport: null,
  })
  const page = await browser.newPage()

  // Navigate to the login page
  await page.goto(FE_URL.ops)
  console.log("Successfully went through the url")

  // Wait for the email input field to be visible
  await page.waitForSelector('input[type="email"]', {
    visible: true,
    timeout: 6000,
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
    timeout: 6000,
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
  await page.waitForSelector('select[name="distributorId"]', { visible: true })
  await page.click('select[name="distributorId"]')
  //   waitForTimeout(100)

  let distributorIdOpt = await page.evaluate(() => {
    const distributorId = document.querySelector('select[name="distributorId"]')
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

  await page.waitForSelector('input[name="pincode"]')
  await page.click('input[name="pincode"]')
  await page.type('input[name="pincode"]', "122001")
  console.log("Pincode Added Successfully!")

  // Search RTO
  await page.waitForSelector('input[name="rto"]', { visible: true })
  await page.click('input[name="rto"]')
  await page.type('input[name="rto"]', "DL01")

  // Wait for the dropdown to appear
  await page.waitForSelector(".css-19bb58m", { visible: true })

  // Find and click the correct option
  const rtoOptions = await page.$$(".css-19bb58m")
  for (const option of rtoOptions) {
    const text = await option.evaluate((el) => el.textContent)
    if (text.includes("DL01 - DELHI RTO")) {
      await option.click()
      console.log("RTO selected successfully!")
    }
  }

  // Add a delay to allow for any post-login processes
  await new Promise((resolve) => setTimeout(resolve, 5000))

  await browser.close()
  console.log("Browser closed")
})()
