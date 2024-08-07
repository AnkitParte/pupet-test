import { clearSelectorValue, waitForTimeout } from "../../../utils/functions.js"

export async function policyPage({ page, isRenew, renewOpt, customerType }) {
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

  let randomNum = "MA1EC2G34H12" + Math.floor(Math.random() * 100000)
  let chassisNum = '#AdditionalDetails form input[name="chassisNumber"]'
  await page.waitForSelector(chassisNum)
  await page.click(chassisNum)
  await page.type(chassisNum, randomNum)

  if (!isRenew) {
    let regNum = '#AdditionalDetails div form input[name="registrationNumber"]'
    await page.waitForSelector(regNum)
    await page.click(regNum)
    await page.type(regNum, "AB12CD3456")
  }

  if (isRenew) {
    // //? previous od
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
    // //? previous od num
    let prevOdNum = '#AdditionalDetails form input[name="prevOdPolicyNum"]'
    await page.click(prevOdNum)
    await page.type(prevOdNum, "ABCDE12345")

    //? previous od date
    let odEndDate = 'input[name="odEndDate"]'
    await page.click(odEndDate)
    let strCalender = "body > div.flatpickr-calendar.animate.open .flatpickr-days .dayContainer"
    await page.waitForSelector(strCalender)
    let odDateVal = await page.evaluate((selector) => {
      const selItem = document.querySelector(selector)

      for (const span of selItem.childNodes) {
        if (span.getAttribute("class") === "flatpickr-day") {
          // console.log("span.arial-label -> ", span.getAttribute("aria-label"))
          return span.getAttribute("aria-label")
        }
      }
    }, strCalender)
    strCalender += ` span[aria-label="${odDateVal}"]`
    await page.waitForSelector(`${strCalender}`)
    await page.click(`${strCalender}`)

    // //? previous tp
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
    // //? previous tp num
    let prevTpNum = '#AdditionalDetails form input[name="prevTpPolicyNum"]'
    await page.click(prevTpNum)
    await page.type(prevTpNum, "ABCDE12345")
    //? previous tp date
    let tpEndDate = 'input[name="tpEndDate"]'
    await page.click(tpEndDate)
    let strCalender2 = "body > div.flatpickr-calendar.animate.open .flatpickr-days .dayContainer"
    await page.waitForSelector(strCalender2)
    let tpDateVal = await page.evaluate((selector) => {
      const selItem = document.querySelector(selector)

      for (const span of selItem.childNodes) {
        if (span.getAttribute("class") === "flatpickr-day") {
          // console.log("span.arial-label -> ", span.getAttribute("aria-label"))
          return span.getAttribute("aria-label")
        }
      }
    }, strCalender2)
    strCalender2 += ` span[aria-label="${tpDateVal}"]`
    await page.waitForSelector(`${strCalender2}`)
    await page.click(`${strCalender2}`)
    // return
  }

  let mobNum = '#AdditionalDetails form input[name="mobileNumber"]'
  await page.click(mobNum)
  await page.type(mobNum, "9129129988")

  let address = '#AdditionalDetails form input[name="addressPrimary"]'
  await page.click(address)
  await clearSelectorValue(page, address)
  await page.type(address, "LIG colony Sector 31")

  let email = '#AdditionalDetails form input[name="email"]'
  await page.click(email)
  await page.type(email, "ankit@aegiscovenant.com")

  if (customerType == "I") {
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
  }

  let submitSel = "#previewPolicy"
  await page.waitForSelector(submitSel)
  await page.click(submitSel)
  // return
  let createPolicySel = "#createPolicy"
  await page.waitForSelector(createPolicySel)
  await page.click(createPolicySel)

  // console.log("Policy Page Done")
}
