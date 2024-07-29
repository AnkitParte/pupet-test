import puppeteer from "puppeteer"
import { FE_URL } from "../utils/constants.js"
import { waitForTimeout } from "../utils/functions.js"
;(async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: false,
    // executablePath: "/opt/homebrew/bin/chromium",
    slowMo: 40,
    ignoreHTTPSErrors: true,
    defaultViewport: null
  })
  const page = await browser.newPage()

  try {
    // Navigate to the login page
    await page.goto(FE_URL.Dev)

    // console.log("successfully went through the url")

    // Wait for the email input field to be visible
    await page.waitForSelector('input[type="email"]', {
      visible: true,
      timeout: 6000
    })
    // Type the email address
    await page.type('input[type="email"]', "tobirama@test.com")

    // Wait for the "Sign in" button to be visible
    await page.waitForSelector('button[type="submit"]', {
      visible: true,
      timeout: 6000
    })
    // Click the "Sign in" button
    await page.click('button[type="submit"]')
    console.log("successfully login !")

    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Wait for the Account element using XPath
    const addAccount = '//*[@id="root"]/div[1]/div[1]/div[3]/ul/li[9]/a'
    const addAccountElement = await page.waitForSelector(
      `xpath/${addAccount}`,
      { visible: true }
    )
    await addAccountElement.click()
    console.log("Clicked on Account in Dealership Panel")

    await page.waitForSelector('input[name="userAcName"]')
    await page.click('input[name="userAcName"]')
    await page.type('input[name="userAcName"]', " Test Account ")
    console.log("Account Name Added Successfully!")

    // Generate random number string
    function generateRandomNumber(length) {
      return Math.floor(Math.random() * Math.pow(10, length))
        .toString()
        .padStart(length, "0")
    }

    // Generate the reference number
    const AccountNumber = generateRandomNumber(10)

    // Add Transaction Reference No.
    await page.waitForSelector('input[name="userAcNumber"]')
    await page.type('input[name="userAcNumber"]', AccountNumber)

    console.log(
      `Transaction Reference No. added successfully: ${AccountNumber}`
    )

    await page.waitForSelector('select[name="userAcCategory"]', {
      visible: true
    })
    await page.click('select[name="userAcCategory"]')
    //   waitForTimeout(100)

    let accountCategoryOpt = await page.evaluate(() => {
      const accountCategory = document.querySelector(
        'select[name="userAcCategory"]'
      )
      console.log("userAcCategory dom", accountCategory)
      let options = () => {
        for (const option of accountCategory.childNodes) {
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
    await page.select('select[name="userAcCategory"]', accountCategoryOpt)
    console.log("Account Category selected successfully!")

    await page.waitForSelector('input[name="userAcIFSC"]')
    await page.click('input[name="userAcIFSC"]')
    await page.type('input[name="userAcIFSC"]', "HDFC0000044")
    console.log("IFSC Added Successfully!")

    const GSTCompliance = "#gstComplianceYes"
    await page.waitForSelector(GSTCompliance)
    await page.click(GSTCompliance)
    console.log("Radio button selected")

    // await page.waitForSelector('input[name="userAadhar"]')
    // await page.click('input[name="userAadhar"]')
    // await page.type('input[name="userAadhar"]', "907856341298")
    // console.log("Aadhar No. Added Successfully!")

    await page.waitForSelector('input[name="userGST"]')
    await page.click('input[name="userGST"]')
    await page.type('input[name="userGST"]', "78HJUIO6789W4Z9")
    console.log("GSTIN No. Added Successfully!")

    await page.waitForSelector('input[name="userPan"]')
    await page.click('input[name="userPan"]')
    await page.type('input[name="userPan"]', "ABCTY1234K")
    console.log("PAN No. Added Successfully!")

    //let fileToUploadAAdhar =
    //"/Users/arpitapandey/OfficeProjects/pupet-test/src/fileholder/sampleJpg.jpeg"

    //const uploadAadhar = await page.waitForSelector("#aadharDoc")
    //await uploadAadhar.uploadFile(fileToUploadAAdhar)
    //console.log("Aadhar uploaded successfully!")

    let fileToUploadPAN =
      "/Users/arpitapandey/OfficeProjects/pupet-test/src/fileholder/sampleJpg.jpeg"

    const uploadPAN = await page.waitForSelector("#panDoc")
    await uploadPAN.uploadFile(fileToUploadPAN)
    console.log("PAN uploaded successfully!")

    let fileToUploadBankDocument =
      "/Users/arpitapandey/OfficeProjects/pupet-test/src/fileholder/sampleJpg.jpeg"

    const uploadBankDocument = await page.waitForSelector("#bankDoc")
    await uploadBankDocument.uploadFile(fileToUploadBankDocument)
    console.log("Aadhar uploaded successfully!")

    await page.waitForSelector('button[type="submit"]', { visible: true })
    await page.click('button[type="submit"]')
    console.log("Form submitted successfully!")
    await waitForTimeout(5000)

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

    const bankAccounts = '//*[@id="root"]/div[1]/div[1]/div[3]/ul/li[4]/a'
    const bankAccountsElement = await page1.waitForSelector(
      `xpath/${bankAccounts}`
    )
    await bankAccountsElement.click()
    console.log("Clicked on bank Accounts in Accounts panel")

    const clickOnPendingAccounts =
      '//*[@id="root"]/div[1]/div[2]/div[3]/div/div[2]/div[3]/div/div/div[1]/table/tbody/tr[1]/td[6]/span'
    const clickOnPendingAccountsElement = await page1.waitForSelector(
      `xpath/${clickOnPendingAccounts}`
    )
    await clickOnPendingAccountsElement.click()
    console.log("Clicked on pending account in Accounts panel")

    const approvAccount =
      "/html/body/div[3]/div/div[1]/div/div/div[2]/div[7]/button[2]"
    const approvAccountElement = await page1.waitForSelector(
      `xpath/${approvAccount}`
    )
    await approvAccountElement.click()
    console.log("Clicked on approved successfully!")

    // Generate random number string
    function generatePayeeIdNumber(length) {
      return Math.floor(Math.random() * Math.pow(10, length))
        .toString()
        .padStart(length, "0")
    }

    // Generate the reference number
    const payeeId = generatePayeeIdNumber(10)
    // Add Transaction Reference No.

    console.log({ payeeId })
    // await waitForTimeout(5000)
    await page1.waitForSelector("#payeeId")
    await page1.click("#payeeId")
    await page1.type("#payeeId", payeeId)

    console.log(`Payee ID added successfully: ${payeeId}`)

    const submitButon =
      "/html/body/div[4]/div/div[1]/div/div/div[2]/div[2]/div/button"
    const submitButonElement = await page1.waitForSelector(
      `xpath/${submitButon}`
    )
    await submitButonElement.click()
    console.log("submitted !")

    await new Promise((resolve) => setTimeout(resolve, 5000))
    //await browser.close()
    console.log("Browser closed!")
  } catch (error) {
    console.error("An error occurred:", error)
  }
})()
