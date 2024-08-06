import puppeteer from "puppeteer"
import { FE_URL } from "../../utils/constants.js"
import { loginPage } from "../../globals/loginPage.js"
import { requestPolicyEndorse } from "./requestPolicyEndorse.js"
import { approvePolicyEndorse } from "./approvePolicyEndorse.js"

export const policyEndorse = async (data) => {
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

    let sourceURL = FE_URL.Loc
    let adminSourceURL = FE_URL.adminLoc
    console.log("sourceURL", sourceURL)
    console.log("adminSourceURL", adminSourceURL)
    await page.goto(sourceURL)
    //   await page.setViewport({ width: 1080, height: 900 })

    //? login page
    await loginPage(page)

    //? request a policy endorsement
    await requestPolicyEndorse({ page })

    //? approve a policy endorsement
    const adminPage = await browser.newPage()
    await adminPage.goto(adminSourceURL)
    await approvePolicyEndorse({ page: adminPage })

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
