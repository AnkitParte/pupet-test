import { chooseOptViaSelector } from "../../utils/functions.js"

export const nomineeDetails = async ({ page }) => {
  let nomineeName = 'input[name="nomineeName"]'
  await page.click(nomineeName)
  await page.type(nomineeName, "Nomu")

  let nomineeAge = 'input[name="nomineeAge"]'
  await page.click(nomineeAge)
  await page.type(nomineeAge, "25")

  let nomineeRel = 'select[name="nomineeRelation"]'
  await chooseOptViaSelector({ page, selector: nomineeRel, optVal: "Brother" })
}
