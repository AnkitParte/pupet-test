import puppeteer from "puppeteer"
import { FE_URL } from "../../utils/constants.js"
import { kycPage } from "./kycPage.js"
import { quotePage } from "./quotePage.js"
import { loginPage } from "../globals/loginPage.js"
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

  let isRenew = args.length && args[0] === "renew" ? true : false
  let renewOpt = args[1]
  let customerType = "I"
  let companyType = args[1]
  // 1 "Expired in last 90 days"
  // 2 "Expired for more than 90 days"
  // else "Not expire"
  if (isRenew) {
    customerType = args[2] || "I"
    companyType = args[3]
    if (customerType != "I") {
      if (companyType == 1) {
        companyType = "proprietor"
      } else if (companyType == 2) {
        companyType = "partnership"
      } else if (companyType == 3) {
        companyType = "public"
      } else if (companyType == 4) {
        companyType = "private"
      } else {
        companyType = "proprietor"
      }
    }
  } else {
    customerType = renewOpt ? "C" : "I"
    // 1 "proprietor"
    // 2 "partnership"
    // 3 "public"
    // 4 "private"
    if (companyType == 1) {
      companyType = "proprietor"
    } else if (companyType == 2) {
      companyType = "partnership"
    } else if (companyType == 3) {
      companyType = "public"
    } else if (companyType == 4) {
      companyType = "private"
    } else {
      companyType = "proprietor"
    }
  }
  //? quote page
  await quotePage({ page, isRenew, renewOpt, customerType })
  // return
  if (isRenew && renewOpt != "none") {
    await inspectionPage(page, customerType)
  }
  // return
  //? kyc page
  await kycPage({ page, isRenew, customerType, companyType })
  // return
  //? policy pages
  await policyPage({ page, isRenew, renewOpt, customerType })

  // await browser.close();
})()
