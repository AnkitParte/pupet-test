import puppeteer from "puppeteer"
import { FE_URL, testPdf } from "../../utils/constants.js"
import { loginPage } from "../globals/loginPage.js"
import { chooseOptViaSelector } from "../../utils/functions.js"

// let args = process.argv.slice(2)
;(async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: false,
    executablePath: "/opt/homebrew/bin/chromium",
    defaultViewport: null,
    ignoreHTTPSErrors: true,
    slowMo: 20
  })
  const page = await browser.newPage()

  console.log(FE_URL.Loc)
  await page.goto(FE_URL.Loc)
  //   await page.setViewport({ width: 1080, height: 900 })

  //? login page
  await loginPage(page)

  let insuHist = '#root li a[href="/policies/my-insurance"]'
  await page.waitForSelector("#root div div")
  await page.waitForSelector(insuHist)
  await page.click(insuHist)

  let filterDd = 'select[name="statusFilter"]'

  await page.waitForSelector(filterDd)
  await chooseOptViaSelector({ page, selector: filterDd, optVal: "Active" })

  await page.waitForSelector("tbody")

  await page.waitForSelector("tbody tr:nth-of-type(1)")
  await page.waitForSelector('tbody tr:nth-of-type(1) td div[class="dropdown"]')
  await page.click('tbody tr:nth-of-type(1) td div[class="dropdown"]')

  await page.waitForSelector('tbody tr:nth-of-type(1) td div div a[role="menuitem"]')
  await page.click("tbody tr:nth-of-type(1) td div div #cancelPolicy")

  // body > div:nth-child(7) > div > div.modal.fade.show
  // /html/body/div[3]/div/div[1]

  let cancelReasonDd = 'select[name="cancelReason"]'
  await chooseOptViaSelector({ page, selector: cancelReasonDd })

  let proofOne = 'input[name="proofFile1"]'
  let invoiceCopy = await page.waitForSelector(proofOne)
  await invoiceCopy.uploadFile(testPdf)

  let proofTwo = 'input[name="proofFile2"]'
  let dealerDecl = await page.waitForSelector(proofTwo)
  await dealerDecl.uploadFile(testPdf)

  let submitSel = "#cancelPolicyModal"
  await page.waitForSelector(submitSel)
  await page.click(submitSel)
  // await browser.close();
})()
