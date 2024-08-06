import { dealershipExecutive } from "../../loginCreds/index.js"
import { testPdf } from "../../utils/constants.js"
import { chooseOptViaSelector, waitForTimeout } from "../../utils/functions.js"
import { adminLoginPage } from "../../globals/adminLoginPage.js"

export const approvePolicyEndorse = async ({ page }) => {
  await adminLoginPage(page)

  let insuEndorseHist = '#root li a[href="/endorsement"]'
  await page.waitForSelector("#root div div")
  await waitForTimeout(1000)
  await page.waitForSelector(insuEndorseHist)
  await page.click(insuEndorseHist)

  let insuEndorseBtn = "#insuEndorseReqBtn"
  await page.waitForSelector(insuEndorseBtn)
  await page.click(insuEndorseBtn)

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
  await page.waitForSelector("tbody tr:nth-of-type(1) td div div #sendMailEndorse")
  await page.click("tbody tr:nth-of-type(1) td div div #sendMailEndorse")

  let sendMailBtn = "#sendMailToInsurerBtn"
  await page.waitForSelector(sendMailBtn)
  await page.click(sendMailBtn)

  let confirmBtn = "#confirmModalBtn"
  await page.waitForSelector(confirmBtn)
  await page.click(confirmBtn)
  await page.waitForSelector("#successToast", { timeout: 50000 })
  let checkIfMailSent = await page.$("#successToast")
  if (!checkIfMailSent) {
    throw new Error("Failed to sent policy endorsement mail")
  }

  await waitForTimeout(1500)
  await page.waitForSelector(statusFilter)
  await chooseOptViaSelector({ page, selector: statusFilter, optVal: "Email-Sent" })

  await page.waitForSelector("tbody")

  await page.waitForSelector("tbody tr:nth-of-type(1)")
  await page.waitForSelector('tbody tr:nth-of-type(1) td div[class="dropdown"]')
  await page.click('tbody tr:nth-of-type(1) td div[class="dropdown"]')

  await page.click("tbody tr:nth-of-type(1) td div div #approveEndorseBtn")

  let docTypeSel = 'select[name="documentType"]'
  await page.waitForSelector(docTypeSel)
  await chooseOptViaSelector({ page, selector: docTypeSel, optVal: "summary" })

  let proofOne = 'input[name="proofFile1"]'
  let uploadDoc = await page.waitForSelector(proofOne)
  await uploadDoc.uploadFile(testPdf)
  await waitForTimeout(1500)

  let submitBtn = 'button[type="submit"]'
  await page.waitForSelector(submitBtn)
  await page.click(submitBtn)

  await page.waitForSelector("#successToast", { timeout: 50000 })
  let checkIfSucceed = await page.$("#successToast")
  if (!checkIfSucceed) {
    throw new Error("Failed to approve policy endorsement")
  }
}
