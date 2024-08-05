import { adminLoginPage } from "../globals/adminLoginPage.js"
import { chooseOptViaSelector, waitForTimeout } from "../../utils/functions.js"
import { dealershipExecutive } from "../../loginCreds/index.js"

export const approvePolicyCancel = async ({ page }) => {
  await adminLoginPage(page)

  let insuCancelHist = '#root li a[href="/cancellation"]'
  await page.waitForSelector("#root div div")
  await page.waitForSelector(insuCancelHist)
  await page.click(insuCancelHist)

  let insuCancelBtn = "#insuCancelReqBtn"
  await page.waitForSelector(insuCancelBtn)
  await page.click(insuCancelBtn)

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
  let inspectCancelPolicy = "#inspectCancelPolicy"
  await page.waitForSelector(inspectCancelPolicy)
  await page.click(inspectCancelPolicy)

  await waitForTimeout(1500)
  let inspectSendMailBtn = "#inspectSendMailBtn"
  await page.waitForSelector(inspectSendMailBtn)
  await page.click(inspectSendMailBtn)

  let sendMailBtn = "#sendMailBtn"
  await page.waitForSelector(sendMailBtn)
  await page.click(sendMailBtn)

  let confirmBtn = "#confirmModalBtn"
  await page.waitForSelector(confirmBtn)
  await page.click(confirmBtn)
  await page.waitForSelector("#successToast", { timeout: 50000 })
  let checkIfMailSent = await page.$("#successToast")
  if (!checkIfMailSent) {
    throw new Error("Failed to sent policy cancellation mail")
  }

  await waitForTimeout(1500)
  await chooseOptViaSelector({ page, selector: statusFilter, optVal: "Email-Sent" })

  await waitForTimeout(1000)
  await page.click(inspectCancelPolicy)

  let approveMaxRefundCancel = "#approveMaxRefundCancel"
  await page.waitForSelector(approveMaxRefundCancel)
  await page.click(approveMaxRefundCancel)

  await page.waitForSelector("#successToast", { timeout: 50000 })
  let checkIfSucceed = await page.$("#successToast")
  if (!checkIfSucceed) {
    throw new Error("Failed to approve policy cancellation")
  }
}
