import puppeteer from "puppeteer"
import { FE_URL } from "../utils/constants.js"
import { waitForTimeout } from "../utils/functions.js"
;(async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: false,
    // executablePath: "/opt/homebrew/bin/chromium",
    slowMo: 30,
    ignoreHTTPSErrors: true,
    defaultViewport: null
  })
  const page = await browser.newPage()
  {
    // Navigate to the login page
    await page.goto(FE_URL.Test)
    //console.log("successfully went through the url")

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
    console.log("Clicked on Topup in Dealership Panel")

    // Add Transaction Date
    const transaction_date = '//*[@id="transactionDate"]'
    const select_date = await page.waitForSelector(`xpath/${transaction_date}`)
    await select_date.click()
    console.log("select date visivle")

    const date = "/html/body/div[2]/div[2]/div/div[2]/div/span[4]"
    const dateElement = await page.waitForSelector(`xpath/${date}`)
    await dateElement.click()
    console.log("Transaction Date addded succesffuly!")

    // Generate random number string
    function generateRandomNumber(length) {
      return Math.floor(Math.random() * Math.pow(10, length))
        .toString()
        .padStart(length, "0")
    }

    // Generate the reference number
    const transactionReferenceNo = generateRandomNumber(10)

    // Add Transaction Reference No.
    await page.waitForSelector('input[name="transactionReferenceNo"]')
    await page.type(
      'input[name="transactionReferenceNo"]',
      transactionReferenceNo
    )

    console.log(
      `Transaction Reference No. added successfully: ${transactionReferenceNo}`
    )

    let fileToUpload =
      "/Users/arpitapandey/OfficeProjects/pupet-test/src/fileholder/transactionProof.png"

    const uploadButton = await page.$("#proofFile")
    uploadButton.uploadFile(fileToUpload)
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
    await waitForTimeout(5000)
  }
  // ops - admin - accounts

  const page1 = await browser.newPage()

  // Navigate to the login page
  await page1.goto(FE_URL.ops)
  //console.log("successfully went through the url")

  // Clear and type the email address
  await page1.evaluate(
    () => (document.querySelector('input[type="email"]').value = "")
  )
  await page1.type('input[type="email"]', "pranav@aegiscovenant.com")

  // Wait for the "Sign in" button to be visible
  await page1.waitForSelector('button[type="submit"]', {
    visible: true,
    timeout: 6000
  })
  // Click the "Sign in" button
  await page1.click('button[type="submit"]')
  //console.log("successfully login !")

  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Wait for the Top-Up element using XPath
  const xpathExpressionAccounts =
    '//*[@id="root"]/div[1]/div[1]/div[3]/ul/li[3]/a'
  const elementA = await page1.waitForSelector(
    `xpath/${xpathExpressionAccounts}`
  )
  await elementA.click()
  console.log("Clicked on Topup Accounts in Accounts panel")

  const view =
    '//*[@id="root"]/div[1]/div[2]/div[3]/div/div[2]/div[3]/div/table/tbody/tr[1]/td[9]/span'
  const viewElement = await page1.waitForSelector(`xpath/${view}`)
  await viewElement.click()
  waitForTimeout(100)
  console.log("Clicked on view")

  // Click the approved button

  await page1.waitForSelector(
    'button[type="button"][class="btn btn-success btn-sm"]',
    {
      visible: true,
      timeout: 6000
    }
  )
  // Click the "Sign in" button
  await page1.click('button[type="button"][class="btn btn-success btn-sm"]')

  console.log("Approved button clicked successfully!")

  await new Promise((resolve) => setTimeout(resolve, 5000))
  // Close the browser
  //await browser.close()
  //console.log("Browser closed!")
})().catch((error) => {
  console.error("An error occurred:", error)
})
