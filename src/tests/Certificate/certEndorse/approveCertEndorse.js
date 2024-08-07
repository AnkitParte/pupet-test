import { dealershipExecutive } from "../../../loginCreds/index.js"
import { chooseOptViaSelector, waitForTimeout } from "../../../utils/functions.js"
import { adminLoginPage } from "../../../globals/adminLoginPage.js"

export const approveCertEndorse = async ({ page }) => {
  await adminLoginPage(page)

  let certEndorseHist = '#root li a[href="/endorsement"]'
  await page.waitForSelector("#root div div")
  await waitForTimeout(1000)
  await page.waitForSelector(certEndorseHist)
  await page.click(certEndorseHist)

  let searchDs = "#dealershipName"
  await page.waitForSelector(searchDs)
  await page.click(searchDs)
  await page.type(searchDs, dealershipExecutive.dealershipName)

  await waitForTimeout(1000)
  let statusFilter = 'select[name="statusFilter"]'
  await page.waitForSelector(statusFilter)
  await chooseOptViaSelector({ page, selector: statusFilter, optVal: "Pending" })

  await page.waitForSelector("tbody")

  await page.waitForSelector("tbody tr:nth-of-type(1)")
  await page.waitForSelector('tbody tr:nth-of-type(1) td div[class="dropdown"]')
  await page.click('tbody tr:nth-of-type(1) td div[class="dropdown"]')
  await page.waitForSelector("tbody tr:nth-of-type(1) td div div #certInspectBtn")
  await page.click("tbody tr:nth-of-type(1) td div div #certInspectBtn")

  let approveEndorseBtn = "#approveEndorseBtn"
  await page.waitForSelector(approveEndorseBtn)
  await page.click(approveEndorseBtn)

  await page.waitForSelector("#successToast", { timeout: 50000 })
  let checkIfSucceed = await page.$("#successToast")
  if (!checkIfSucceed) {
    throw new Error("Failed to approve certificate endorsement")
  }
}
