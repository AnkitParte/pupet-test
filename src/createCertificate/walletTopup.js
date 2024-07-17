import puppeteer from "puppeteer"
import { FE_URL } from "../utils/constants.js"
import { waitForTimeout } from "../utils/functions.js"
;(async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: false,
    // executablePath: "/opt/homebrew/bin/chromium",
    slowMo: 60,
    ignoreHTTPSErrors: true,
    defaultViewport: null
  })
  const page = await browser.newPage()

  // Navigate to the login page
  await page.goto(FE_URL.Loc)
  console.log("successfully went through the url")

  // Wait for the email input field to be visible
  await page.waitForSelector('input[type="email"]', {
    visible: true,
    timeout: 6000
  })
  // Type the email address
  await page.type('input[type="email"]', "kisame@test.com")

  // Wait for the "Sign in" button to be visible
  await page.waitForSelector('button[type="submit"]', {
    visible: true,
    timeout: 6000
  })
  // Click the "Sign in" button
  await page.click('button[type="submit"]')
  console.log("successfully login !")

  await new Promise((resolve) => setTimeout(resolve, 3000))

  // Wait for the Top-Up element using XPath
  const xpathExpression = '//*[@id="root"]/div[1]/div[1]/div[3]/ul/li[6]/a'
  const element = await page.waitForSelector(`xpath/${xpathExpression}`)
  await element.click()
  console.log("Clicked on Topup")

  // Add Transaction Date
  const transaction_date = '//*[@id="transactionDate"]'
  const select_date = await page.waitForSelector(`xpath/${transaction_date}`)
  await select_date.click()
  console.log("select date visivle")

  const date = "/html/body/div[2]/div[2]/div/div[2]/div/span[4]"
  const dateElement = await page.waitForSelector(`xpath/${date}`)
  await dateElement.click()
  console.log("Transaction Date addded succesffuly!")

  // Add Transaction Reference No.
  await page.waitForSelector('input[name="transactionReferenceNo"]')
  await page.click('input[name="transactionReferenceNo"]')
  await page.type('input[name="transactionReferenceNo"]', "8754895")
  console.log("Transaction Reference No. addded succesffuly!")

  let fileToUpload = "/Users/ankitparte/ActiveProject/testing-pup/src/fileholder/transactionProof.png"

  //! from policy-gen
  const uploadButton = await page.$("#proofFile")
  uploadButton.uploadFile(fileToUpload)
  //!
  await waitForTimeout(2000)
  console.log("Transaction Proof uploaded successfully!")
  // select payment mode
  await page.waitForSelector('select[name="paymentMode"]', { visible: true })
  await page.click('select[name="paymentMode"]')
  //   waitForTimeout(100)

  let paymentModeOpt = await page.evaluate(() => {
    const paymentMode = document.querySelector('select[name="paymentMode"]')
    console.log("paymentMode dom", paymentMode)
    let options = () => {
      for (const option of paymentMode.childNodes) {
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
  await page.select('select[name="paymentMode"]', paymentModeOpt)
  console.log("Payment Mode selected successfully!")

  // Add Amount(₹)

  await page.waitForSelector('input[name="topupAmount"]', { visible: true })
  await page.click('input[name="topupAmount"]')
  await page.type('input[name="topupAmount"]', "100000")
  console.log("Amount entered successfully!")

  // Click Submit button
  await page.waitForSelector('button[type="submit"]', { visible: true })
  await page.click('button[type="submit"]')
  console.log("Form submitted successfully!")

  await new Promise((resolve) => setTimeout(resolve, 10000))

  // Close the browser
  // await browser.close()
  console.log("browser closed !")
})().catch((error) => {
  console.error("An error occurred:", error)
})
