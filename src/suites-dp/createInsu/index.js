import puppeteer from "puppeteer"
import { FE_URL } from "../../utils/constants.js"
import { kycPage } from "./kycPage.js"
import { quotePage } from "./quotePage.js"
import { loginPage } from "./loginPage.js"
import { policyPage } from "./policyPage.js"
import { inspectionPage } from "./inspectPage.js"

let args = process.argv.slice(2)
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

  // let insuHist = '#root li a[href="/policies/my-insurance"]'
  // await page.waitForSelector("#root div div")
  // await page.waitForSelector(insuHist)
  // await page.click(insuHist)

  let isRenew = args.length && args[0] === "renew" ? true : false
  //? quote page
  await quotePage(page, isRenew)

  if (isRenew) {
    await inspectionPage(page)
  }
  //? kyc page
  // await kycPage(page)

  //? policy page
  // await policyPage(page)

  // await browser.close();
})()
