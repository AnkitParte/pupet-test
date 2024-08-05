import puppeteer from "puppeteer"
import { FE_URL } from "../../utils/constants.js"
import { loginPage } from "../globals/loginPage.js"
import { basicDetails } from "./basicDetails.js"
import { vehicleDetails } from "./vehicleDetails.js"
import { nomineeDetails } from "./nomineeDetails.js"
import { certPlanBox } from "./certPlanBox.js"
import { waitForTimeout } from "../../utils/functions.js"

export const createCertTest = async (data) => {
  let { type, forId, planType: planTypeId, headlessOff = false } = data
  let head = headlessOff ? false : true
  let isRenew = type == "renew" ? true : false

  let customerType = forId
  let planType = planTypeId
  // console.log("")
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: false,
    executablePath: "/opt/homebrew/bin/chromium",
    defaultViewport: null,
    ignoreHTTPSErrors: true,
    slowMo: 25,
    headless: head
  })
  try {
    if (!head) {
      console.log("Going Head full")
    }
    const page = await browser.newPage()
    let sourceURL = FE_URL.Loc
    // console.log(sourceURL)
    await page.goto(sourceURL)

    //? login page
    await loginPage(page)

    //! Code to tackle frontend bug
    // let logOutBtnSel = "#LogoutNowBtn"
    // let isReLogin = await page.$(logOutBtnSel)
    // // console.log("isReLogin", isReLogin)
    // if (isReLogin) {
    // //? login page
    // await page.waitForSelector(logOutBtnSel)
    // await page.click(logOutBtnSel)
    // await loginPage(page)
    // }
    //! end

    await waitForTimeout(500)
    let newCert = '#root li a[href="/policies/certificates"]'
    await page.waitForSelector("#root div div")
    await page.waitForSelector(newCert)
    await page.click(newCert)

    await waitForTimeout(1000)
    if (isRenew) {
      // #newVehicle1No
      await page.click("#newVehicle1No")
    }

    await basicDetails({ page, customerType })

    await vehicleDetails({ page })

    if (customerType == "I") await nomineeDetails({ page })

    await certPlanBox({ page, planType })
    await browser.close()
    return {
      status: true
    }
  } catch (e) {
    await browser.close()
    // console.log(`error ${customerType}`, e)
    return {
      status: false,
      message: e?.message,
      errorJson: JSON.stringify(e)
    }
  }
}

// createCertTest({})
