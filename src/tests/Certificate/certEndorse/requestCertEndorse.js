import { testPdf } from "../../../utils/constants.js"
import { chooseOptViaSelector, clearSelectorValue, waitForTimeout } from "../../../utils/functions.js"

export const requestCertEndorse = async ({ page }) => {
  let certHist = '#root li a[href="/policies/my-certificates"]'
  await page.waitForSelector("#root div div")
  await waitForTimeout(1000)
  await page.waitForSelector(certHist)
  await page.click(certHist)

  let filterDd = 'select[name="statusFilter"]'

  await page.waitForSelector(filterDd)
  await chooseOptViaSelector({ page, selector: filterDd, optVal: "Active" })

  await page.waitForSelector("tbody")

  await page.waitForSelector("tbody tr:nth-of-type(1)")
  await page.waitForSelector('tbody tr:nth-of-type(1) td div[class="dropdown"]')
  await page.click('tbody tr:nth-of-type(1) td div[class="dropdown"]')

  await page.waitForSelector('tbody tr:nth-of-type(1) td div div a[role="menuitem"]')
  await page.click('tbody tr:nth-of-type(1) td div div a[role="menuitem"]')
  //   await page.click("tbody tr:nth-of-type(1) td div div #requestEndorseBtn")
  await page.waitForSelector("form")

  let endorseReasonSel = 'select[name="endorsementReason"]' // value="Personal Details"
  await chooseOptViaSelector({ page, selector: endorseReasonSel, optVal: "Personal Details" })

  let proofOne = 'input[name="invoiceCopy"]'
  let invoiceCopy = await page.waitForSelector(proofOne)
  await invoiceCopy.uploadFile(testPdf)
  await waitForTimeout(1500)

  let proofTwo = 'input[name="dealerDeclaration"]'
  let dealerDecl = await page.waitForSelector(proofTwo)
  await dealerDecl.uploadFile(testPdf)
  await waitForTimeout(1500)

  let mobile = 'input[name="mobile"]'
  await page.click(mobile)
  await clearSelectorValue(page, mobile)
  await page.type(mobile, "9119119119")

  let address = 'input[name="address1"]'
  await page.click(address)
  await clearSelectorValue(page, address)
  await page.type(address, "123 Main St")

  let submitSel = 'form button[type="submit"]'
  await page.waitForSelector(submitSel)
  await page.click(submitSel)

  await waitForTimeout(1000)
}
