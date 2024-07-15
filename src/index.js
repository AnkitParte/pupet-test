import puppeteer from "puppeteer-core"

const browser = await puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
  headless: false,
  executablePath: "/opt/homebrew/bin/chromium",
  defaultViewport: null,
  ignoreHTTPSErrors: true,
  slowMo: 50
})
const page = await browser.newPage()

//? https://dev.dealer.aegiscovenant.com  https://test.dealer.aegiscovenant.com  http://localhost:3000
await page.goto("http://localhost:3000")

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

await page.waitForSelector("div#instant-quote")
// await page.waitForSelector('input[name="pincode"]')
// await page.click('input[name="pincode"]')
// await page.type('input[name="pincode"]', "122001")

await page.waitForSelector("input#pincode")

// Check if the input field is actually present
const inputExists = (await page.$("input#pincode")) !== null
// console.log("Input field exists:", inputExists)

// Click on the input field to focus on it and type the value
await page.click("input#pincode")
await page.type("input#pincode", "122001")

// await browser.close();
