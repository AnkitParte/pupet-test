import puppeteer from "puppeteer"
import { FE_URL } from "../../../utils/constants.js"
import { loginPage } from "../../../globals/loginPage.js"
import { requestCancel } from "./requestPolicyCancel.js"
import { approvePolicyCancel } from "./approvePolicyCancel.js"

// let args = process.argv.slice(2)
export const policyCancel = async (data) => {
  let { headless = false } = data
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: headless,
    executablePath: "/opt/homebrew/bin/chromium",
    defaultViewport: null,
    ignoreHTTPSErrors: true,
    slowMo: 30
  })
  try {
    const page = await browser.newPage()

    let sourceURL = FE_URL.Dev
    let adminSourceURL = FE_URL.adminDev
    console.log(sourceURL)
    await page.goto(sourceURL)
    //   await page.setViewport({ width: 1080, height: 900 })

    //? login page
    await loginPage(page)

    //? request a policy cancellation
    await requestCancel({ page })

    //? approve a policy cancellation
    const adminPage = await browser.newPage()
    await adminPage.goto(adminSourceURL)
    await approvePolicyCancel({ page: adminPage })

    await browser.close()
    return {
      status: true
    }
  } catch (e) {
    await browser.close()
    console.log("error", e)
    return {
      status: false,
      message: e?.message,
      errorJson: JSON.stringify(e)
    }
  }
}
