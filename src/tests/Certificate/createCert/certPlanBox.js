import { chooseOptViaSelector, waitForTimeout } from "../../../utils/functions.js"

export const certPlanBox = async ({ page, planType = "fixed" }) => {
  let planValue = "93aa4c77"
  if (planType == "special") {
    planValue = "e257823e"
  } else if (planType == "dynamic") {
    planValue = "42211159"
  } else {
    planValue = "93aa4c77"
  }
  let certPlanSel = 'select[name="productPlanType"]'
  await chooseOptViaSelector({ page, selector: certPlanSel, optVal: planValue })
  await waitForTimeout(500)

  // certPlanType01
  if (planType == "special") {
    let specialPlan = "#certPlanType11"
    await page.click(specialPlan)
  } else if (planType == "dynamic") {
    let dynPlan = "#certPlanType11"
    await page.click(dynPlan)
  } else {
    let fixedPlan = "#certPlanType01"
    await page.click(fixedPlan)
  }

  let createCertBtn = "#createCertificateBtn"
  await page.click(createCertBtn)
}
