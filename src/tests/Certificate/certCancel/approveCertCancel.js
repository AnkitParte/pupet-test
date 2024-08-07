import { adminLoginPage } from "../../../globals/adminLoginPage.js"
import { chooseOptViaSelector, waitForTimeout } from "../../../utils/functions.js"
import { dealershipExecutive } from "../../../loginCreds/index.js"

export const approveCertCancel = async ({ page }) => {
  await adminLoginPage(page)

  let insuCancelHist = '#root li a[href="/cancellation"]'
  await page.waitForSelector("#root div div")
  await waitForTimeout(1000)
  await page.waitForSelector(insuCancelHist)
  await page.click(insuCancelHist)

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
  await page.waitForSelector("tbody tr:nth-of-type(1)")

  let inspectCancelCert = "tbody tr:nth-of-type(1) td div div #inspectCancelCert"
  await page.waitForSelector(inspectCancelCert)
  await page.click(inspectCancelCert)

  let approveCertCancel = "#approveCertCancelBtn"
  await page.waitForSelector(approveCertCancel)
  await page.click(approveCertCancel)

  await page.waitForSelector("#successToast", { timeout: 50000 })
  let checkIfSucceed = await page.$("#successToast")
  if (!checkIfSucceed) {
    throw new Error("Failed to approve policy cancellation")
  }
}
