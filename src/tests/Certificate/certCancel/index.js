import puppeteer from "puppeteer"
import { FE_URL } from "../../../utils/constants.js"
import { loginPage } from "../../../globals/loginPage.js"
import { requestCertCancel } from "./requestCertCancel.js"
import { approveCertCancel } from "./approveCertCancel.js"

export const certCancel = async (data) => {
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
    console.log("Creating Cancellation")
    const page = await browser.newPage()

    let sourceURL = FE_URL.Dev
    let adminSourceURL = FE_URL.adminDev
    // console.log(sourceURL)
    await page.goto(sourceURL)
    //   await page.setViewport({ width: 1080, height: 900 })

    //? login page
    await loginPage(page)

    //? request a policy cancellation
    await requestCertCancel({ page })

    //? approve a policy cancellation
    const adminPage = await browser.newPage()
    await adminPage.goto(adminSourceURL)
    await approveCertCancel({ page: adminPage })

    // await browser.close()
    return {
      status: true
    }
  } catch (e) {
    // await browser.close()
    console.log("error", e)
    return {
      status: false,
      message: e?.message,
      errorJson: JSON.stringify(e)
    }
  }
}
