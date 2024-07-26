import { waitForTimeout } from "../../utils/functions.js"

export async function kycPage(page, isRenew) {
  await page.waitForSelector("#KYC")
  // await waitForTimeout(1000)
  let gender = "#KYC div form #gender0Male"
  await page.waitForSelector(gender)
  await page.click(gender)

  if (!isRenew) {
    await page.click('input[name="firstName"]')
    await page.type('input[name="firstName"]', "Ankit")

    await page.click('input[name="lastName"]')
    await page.type('input[name="lastName"]', "Parte")
  }

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
  await page.type('input[name="documentNumberCkyc"]', "497389784361")

  await page.click('input[name="consent"]')

  await page.waitForSelector('#KYC form button[type="submit"]')
  await page.click('#KYC form button[type="submit"]')
  await waitForTimeout(2000)
  console.log("Kyc Page Done")
}
