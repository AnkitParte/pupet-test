import puppeteer from "puppeteer"
import { FE_URL } from "../../utils/constants.js"
import { kycPage } from "./kycPage.js"
import { quotePage } from "./quotePage.js"
import { loginPage } from "../globals/loginPage.js"
import { policyPage } from "./policyPage.js"
import { inspectionPage } from "./inspectPage.js"
import { waitForTimeout } from "../../utils/functions.js"

export const createInsuTest = async (data) => {
  let { vehicleType, renewOption, customerType: customerTypeId, companyType: companyTypeId, corporateTypeId, isHeadless } = data
  let head = !isHeadless ? false : true
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath: "/opt/homebrew/bin/chromium",
    defaultViewport: null,
    ignoreHTTPSErrors: true,
    slowMo: 20,
    headless: head
  })
  // console.log("data -> ", data)
  const page = await browser.newPage()
  try {
    if (!head) {
      console.log("Going Headless")
    }
    let sourceURL = FE_URL.Loc
    // console.log(sourceURL)
    await page.goto(sourceURL)
    //   await page.setViewport({ width: 1080, height: 900 })

    //? login page
    await loginPage(page)

    let isRenew = vehicleType == "renew" ? true : false
    let companyType
    let customerType = customerTypeId
    let renewOpt = renewOption

    if (corporateTypeId == 1) {
      companyType = "proprietor"
    } else if (corporateTypeId == 2) {
      companyType = "partnership"
    } else if (corporateTypeId == 3) {
      companyType = "public"
    } else if (corporateTypeId == 4) {
      companyType = "private"
    } else {
      companyType = "proprietor"
    }
    // 1 "Expired in last 90 days"
    // 2 "Expired for more than 90 days"
    // else "Not expire"

    await waitForTimeout(1000)
    let logOutBtnSel = "#LogoutNowBtn"
    let isReLogin = await page.$(logOutBtnSel)
    console.log("isReLogin", isReLogin)
    if (isReLogin) {
      //? login page
      await page.waitForSelector(logOutBtnSel)
      await page.click(logOutBtnSel)
      await loginPage(page)
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

    await browser.close()
    return {
      status: true
    }
  } catch (e) {
    await browser.close()
    return {
      status: false,
      message: e?.message,
      errorJson: JSON.stringify(e)
    }
  }
}
