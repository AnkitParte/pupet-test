import puppeteer from "puppeteer" // Change this from puppeteer-core to puppeteer
import { FE_URL } from "../utils/constants.js"

async function createCertificate() {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: false,
    //executablePath: "/opt/homebrew/bin/chromium",
    defaultViewport: null,
    ignoreHTTPSErrors: true,
    slowMo: 60,
  })

  // Rest of the code remains the same
  const page = await browser.newPage()

  console.log(FE_URL.Test)
  await page.goto(FE_URL.Test)

  // Wait for the input box to be available
  await page.waitForSelector("input#login-email")
  await page.click("input#login-email")
  await page.type("input#login-email", "kisame@test.com")

  await page.waitForSelector("form") // Optionally wait for the form to be present
  await page.waitForSelector('form button[type="submit"]') // Replace with the actual selector for the submit button

  // Click the submit button
  await page.click('form button[type="submit"]')
  // Close the browser when done
  await browser.close()
}

// Call the function
createCertificate().catch(console.error)
