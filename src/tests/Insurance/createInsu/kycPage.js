import { UNITED } from "../../../utils/constants.js"
import { chooseOptViaSelector, clearSelectorValue, customDateSelector, waitForTimeout } from "../../../utils/functions.js"

export async function kycPage({ page, customerType = "I", companyType, insurer }) {
  await page.waitForSelector("#KYC")
  await waitForTimeout(1500)
  let gender = "#gender0Male"
  if (customerType != "C") {
    await page.waitForSelector(gender)
    await page.click(gender)
  }

  let firstName = 'input[name="firstName"]'

  if (customerType === "C") {
    await page.click(firstName)
    await clearSelectorValue(page, firstName)
    // await page.type(firstName, "X-men Pvt. Ltd.")
    await page.type(firstName, "Ankit Parte")
  } else {
    await page.waitForSelector(gender)
    await page.click(gender)

    await page.click(firstName)
    await clearSelectorValue(page, firstName)
    await page.type(firstName, "Ankit")

    let lastName = 'input[name="lastName"]'
    await page.click(lastName)
    await clearSelectorValue(page, lastName)
    await page.type(lastName, "Parte")
  }

  await waitForTimeout(500)
  // return
  await page.waitForSelector('input[name="dob"]')
  await page.click('input[name="dob"]')
  await page.waitForSelector(".flatpickr-calendar")
  await page.waitForSelector(".flatpickr-months")
  await page.waitForSelector(".flatpickr-innerContainer")
  // console.log("selector existed")
  // await new Promise((resolve) => setTimeout(resolve, 1000))

  //! choose year of dob
  await page.waitForSelector("body > div.flatpickr-calendar.animate.open")
  await page.waitForSelector("body > div.flatpickr-calendar.animate.open .numInput")
  let strYear = "body > div.flatpickr-calendar.animate.open .numInput"
  await page.click(strYear)
  await page.type(strYear, "1998")

  //! choose month of dob
  let strMonth = "body > div.flatpickr-calendar.animate.open .flatpickr-monthDropdown-months"
  let monthSelect = await page.waitForSelector(strMonth, {
    visible: true
  })
  await monthSelect.click()
  let dobMonth = await page.evaluate(() => {
    let strMonth = "body > div.flatpickr-calendar.animate.open .flatpickr-monthDropdown-months"
    let month = document.querySelector(strMonth)
    let options = () => {
      for (let m of month.childNodes) {
        if (m.value === "11") {
          m.selected = "selected"
          return m.getAttribute("value")
        }
      }
    }
    return options()
  })
  await page.select(strMonth, dobMonth)

  //! choose date of dob
  let strDate = "body > div.flatpickr-calendar.animate.open .flatpickr-days"
  await page.waitForSelector(strDate)
  let dobDate = 'body > div.flatpickr-calendar.animate.open .flatpickr-days .dayContainer span[aria-label="December 4, 1998"]'
  await page.waitForSelector(dobDate)
  await page.click(dobDate)

  await waitForTimeout(1000)
  let firmTypeSel = 'select[name="companyType"]'
  // console.log("companyType ->", companyType)
  if (customerType == "C" && insurer == UNITED) {
    if (companyType == "proprietor" || companyType == "partnership") {
      await chooseOptViaSelector({ page, selector: firmTypeSel, optVal: companyType })

      let firmGstNum = 'input[name="gstNumber"]'
      await page.click(firmGstNum)
      await page.type(firmGstNum, "28OUZAJ2291F3Z7")

      let salutationSel = 'select[name="ownerSalutation"]'
      await chooseOptViaSelector({ page, selector: salutationSel })

      let ownerName = 'input[name="ownerName"]'
      await page.click(ownerName)
      await page.type(ownerName, "Ankit Parte")

      let ownerDob = 'input[name="ownerDob"]'
      await customDateSelector({ page, selector: ownerDob })

      let ownerPan = 'input[name="ownerPan"]'
      await page.click(ownerPan)
      await page.type(ownerPan, "EGWPP0945N")
    } else if (companyType == "public" || companyType == "private") {
      await chooseOptViaSelector({ page, selector: firmTypeSel, optVal: companyType })
      let firmGstNum = 'input[name="gstNumber"]'
      await page.click(firmGstNum)
      await page.type(firmGstNum, "28OUZAJ2291F3Z7")
    }
  }

  await page.waitForSelector('select[name="documentTypeCkyc"]')
  await page.click('select[name="documentTypeCkyc"]')
  let ckycType = await page.evaluate(() => {
    const ckyc = document.querySelector('select[name="documentTypeCkyc"]')
    // console.log("customerType", variant)
    let options = () => {
      for (const option of ckyc.childNodes) {
        console.log("option", option)
        if (option.value) {
          option.selected = "selected"
          return option.getAttribute("value")
        }
      }
    }
    // console.log(options())
    return options()
  })

  await page.select('select[name="documentTypeCkyc"]', ckycType)

  await page.click('input[name="documentNumberCkyc"]')
  let docNum = customerType === "C" ? "EGWPP0946N" : "497389784361"
  await page.type('input[name="documentNumberCkyc"]', docNum)

  await page.click('input[name="consent"]')

  await page.waitForSelector('#KYC form button[type="submit"]')
  await page.click('#KYC form button[type="submit"]')
  await waitForTimeout(2000)
  // console.log("Kyc Page Done")
}
