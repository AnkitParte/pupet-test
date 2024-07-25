import { waitForTimeout } from "../../utils/functions.js"

export async function policyPage(page, isRenew) {
  await page.waitForSelector("#AdditionalDetails")
  await waitForTimeout(2000)

  await page.waitForSelector("#AdditionalDetails div")
  await waitForTimeout(2000)

  await page.waitForSelector("#AdditionalDetails div form")
  await waitForTimeout(2000)

  let engineNum = '#AdditionalDetails form input[name="engineNumber"]'
  await page.waitForSelector(engineNum)
  await page.click(engineNum)
  await page.type(engineNum, "ABCDJKLL99")

  let chassisNum = '#AdditionalDetails form input[name="chassisNumber"]'
  await page.waitForSelector(chassisNum)
  await page.click(chassisNum)
  await page.type(chassisNum, "MA1EC2G34H1234571")

  if (!isRenew) {
    let regNum = '#AdditionalDetails div form input[name="registrationNumber"]'
    await page.waitForSelector(regNum)
    await page.click(regNum)
    await page.type(regNum, "AB12CD3456")
  }

  if (isRenew) {
    //? previous od
    let prevOd = '#AdditionalDetails form select[name="previousOdInsurer"]'
    await page.click(prevOd)
    let prevOdOpt = await page.evaluate(() => {
      let itemSel = document.querySelector('#AdditionalDetails form select[name="previousOdInsurer"]')
      let options = () => {
        for (let it of itemSel.childNodes) {
          if (it.value) {
            it.selected = "selected"
            return it.getAttribute("value")
          }
        }
      }
      return options()
    })
    await page.select(prevOd, prevOdOpt)
    //? previous od num
    let prevOdNum = '#AdditionalDetails form input[name="prevOdPolicyNum"]'
    await page.click(prevOdNum)
    await page.type(prevOdNum, "ABCDE12345")

    //? previous tp
    let prevTp = '#AdditionalDetails form select[name="previousTpInsurer"]'
    await page.click(prevOd)
    let prevTpOpt = await page.evaluate(() => {
      let itemSel = document.querySelector('#AdditionalDetails form select[name="previousTpInsurer"]')
      let options = () => {
        for (let it of itemSel.childNodes) {
          if (it.value) {
            it.selected = "selected"
            return it.getAttribute("value")
          }
        }
      }
      return options()
    })
    await page.select(prevTp, prevTpOpt)
    //? previous tp num
    let prevTpNum = '#AdditionalDetails form input[name="prevTpPolicyNum"]'
    await page.click(prevTpNum)
    await page.type(prevTpNum, "ABCDE12345")
  }

  let mobNum = '#AdditionalDetails form input[name="mobileNumber"]'
  await page.click(mobNum)
  await page.type(mobNum, "9129129988")

  let address = '#AdditionalDetails form input[name="addressPrimary"]'
  await page.click(address)
  await page.type(address, "LIG colony Sector 31")

  let email = '#AdditionalDetails form input[name="email"]'
  await page.click(email)
  await page.type(email, "ankit@aegiscovenant.com")

  let gender = "#AdditionalDetails form #genderNominee0Male"
  await page.waitForSelector(gender)
  await page.click(gender)

  let nomineeName = '#AdditionalDetails form input[name="nomineeName"]'
  await page.click(nomineeName)
  await page.type(nomineeName, "Nomu")

  let nomineeAge = '#AdditionalDetails form input[name="nomineeAge"]'
  await page.click(nomineeAge)
  await page.type(nomineeAge, "24")

  let nomineeRelation = '#AdditionalDetails form select[name="nomineeRelation"]'
  await page.click(nomineeRelation)
  let relOpt = await page.evaluate(() => {
    let relSel = document.querySelector('#AdditionalDetails form select[name="nomineeRelation"]')
    let options = () => {
      for (let it of relSel.childNodes) {
        if (it.value === "Brother") {
          it.selected = "selected"
          return it.getAttribute("value")
        }
      }
    }
    return options()
  })
  await page.select(nomineeRelation, relOpt)

  // let submitSel = '#AdditionalDetails form button[type="submit"]'
  // await page.waitForSelector(submitSel)
  // await page.click(submitSel)
  console.log("Policy Page Done")
}
