import { testPdf } from "../../utils/constants.js"
import { chooseOptViaSelector, waitForTimeout } from "../../utils/functions.js"

export const requestCancel = async ({ page }) => {
  let insuHist = '#root li a[href="/policies/my-insurance"]'
  await page.waitForSelector("#root div div")
  await page.waitForSelector(insuHist)
  await page.click(insuHist)

  let filterDd = 'select[name="statusFilter"]'

  await page.waitForSelector(filterDd)
  await chooseOptViaSelector({ page, selector: filterDd, optVal: "Active" })

  await page.waitForSelector("tbody")

  await page.waitForSelector("tbody tr:nth-of-type(1)")
  await page.waitForSelector('tbody tr:nth-of-type(1) td div[class="dropdown"]')
  await page.click('tbody tr:nth-of-type(1) td div[class="dropdown"]')

  await page.waitForSelector('tbody tr:nth-of-type(1) td div div a[role="menuitem"]')
  await page.click("tbody tr:nth-of-type(1) td div div #cancelPolicy")

  // body > div:nth-child(7) > div > div.modal.fade.show
  // /html/body/div[3]/div/div[1]

  let cancelReasonDd = 'select[name="cancelReason"]'
  await chooseOptViaSelector({ page, selector: cancelReasonDd })

  let proofOne = 'input[name="proofFile1"]'
  let invoiceCopy = await page.waitForSelector(proofOne)
  await invoiceCopy.uploadFile(testPdf)
  await waitForTimeout(1500)

  let proofTwo = 'input[name="proofFile2"]'
  let dealerDecl = await page.waitForSelector(proofTwo)
  await dealerDecl.uploadFile(testPdf)
  await waitForTimeout(1500)

  let submitSel = "#requestCancelPolicyBtn"
  await page.waitForSelector(submitSel)
  await page.click(submitSel)

  await page.waitForSelector("#successToast", { timeout: 50000 })
  let checkIfSucceed = await page.$("#successToast")
  if (!checkIfSucceed) {
    throw new Error("Failed to request policy cancellation")
  }
}
