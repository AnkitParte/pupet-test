import { chooseOptViaSelector, clearSelectorValue, waitForTimeout } from "../../../utils/functions.js"

export async function quotePage({ page, isRenew, renewOpt, customerType, bikeDetails }) {
  //? create insurance instant-quote form fill
  // console.log(await page.$("#make"))
  await page.waitForSelector("#instant-quote")
  // console.log("quote page")
  await waitForTimeout(2000)
  let resetBtn = "#resetQuoteForm"
  await page.waitForSelector(resetBtn)
  await page.click(resetBtn)

  let { make, model, rto, pincode, idv } = bikeDetails

  if (isRenew) {
    let selRenewPol = "#newPolicy1false"
    await page.waitForSelector(selRenewPol)
    await page.click(selRenewPol)

    let randomNum = "MP22MC" + Math.floor(Math.random() * 10000)
    let selVehicleNum = 'input[name="vehicleRegistrationNumb"]'
    await page.waitForSelector(selVehicleNum)
    await page.click(selVehicleNum)
    await page.type(selVehicleNum, randomNum)
    await waitForTimeout(1500)
    let expr = "#policyExpiry2Expired"
    // let expr
    // console.log("renewOpt -> ", renewOpt)
    if (renewOpt == 1) {
      expr = 'input[value="Expired in last 90 days"]'
    } else if (renewOpt == 2) {
      expr = 'input[value="Expired for more than 90 days"]'
    } else {
      expr = 'input[value="Not expire"]'
    }
    await page.waitForSelector(expr)
    await page.click(expr)

    if (renewOpt != 2) {
      let claim = "#claimInPreviousPolicy0yes"
      await page.waitForSelector(claim)
      await page.click(claim)
    }
  }
  // console.log("make")
  let makeSel = "div#make"
  await page.waitForSelector(makeSel)
  await page.click(makeSel)
  await waitForTimeout(500)
  await page.type(makeSel, make)
  await waitForTimeout(200)
  await page.waitForSelector("#make .css-i97cuk-menu", { visible: true })
  await page.click("#make .css-i97cuk-menu")
  await waitForTimeout(1000)

  // console.log("model")
  let modelSel = "div#model"
  await page.waitForSelector(modelSel)
  await page.click(modelSel)
  await waitForTimeout(500)
  await page.type(modelSel, model)
  await waitForTimeout(200)
  await page.waitForSelector("#model .css-i97cuk-menu", { visible: true })
  await page.click("#model .css-i97cuk-menu")
  await waitForTimeout(1000)

  // console.log("variant")
  await page.waitForSelector("div#variant")
  await page.click("div#variant")
  await waitForTimeout(500)
  await page.waitForSelector("#variant .css-i97cuk-menu", { visible: true })
  await page.click("#variant .css-i97cuk-menu")

  //? no need if date is auto-selected
  //   await page.waitForSelector('input[name="riskStartDate"]', { visible: true })
  //   await page.click('input[name="riskStartDate"]')
  //   await page.keyboard.press("Enter")

  if (isRenew) {
    // let regDate = "body > div.flatpickr-calendar.animate.open .flatpickr-days .dayContainer span:nth-child(10)"
    let coverageSel = 'select[name="coverage"]'
    await page.waitForSelector(coverageSel)
    await page.click(coverageSel)

    let coverOpt = await page.evaluate(() => {
      const cover = document.querySelector('select[name="coverage"]')
      // console.log("customerType", variant)
      let options = () => {
        for (const option of cover.childNodes) {
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

    await page.select(coverageSel, coverOpt)

    //! date old, low success rate
    // let regDate =
    //   "body > div.flatpickr-calendar.animate.arrowBottom.arrowLeft.open > div.flatpickr-innerContainer > div > div.flatpickr-days > div > span:nth-child(14)"
    // await page.waitForSelector(regDate)
    // await page.click(regDate)

    //! need refactoring
    await page.click('input[name="registrationDate"]')
    //! choose year of dob
    await page.waitForSelector("body > div.flatpickr-calendar.animate.open")
    await page.waitForSelector("body > div.flatpickr-calendar.animate.open .numInput")
    let strYear = "body > div.flatpickr-calendar.animate.open .numInput"
    await page.click(strYear)
    await page.type(strYear, "2023")

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
          if (m.value === "1") {
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
    let dobDate = 'body > div.flatpickr-calendar.animate.open .flatpickr-days .dayContainer span[aria-label="February 1, 2023"]'
    await page.waitForSelector(dobDate)
    await page.click(dobDate)
    //!
  } else {
    //? registration date select new
    let regDate = 'input[name="registrationDate"]'
    const select_date = await page.waitForSelector(regDate, {
      visible: true
    })
    await select_date.click()

    let strCalender = "body > div.flatpickr-calendar.animate.open .flatpickr-days .dayContainer"
    await page.waitForSelector(strCalender)
    let odDateVal = await page.evaluate((selector) => {
      const selItem = document.querySelector(selector)

      for (const span of selItem.childNodes) {
        if (span.getAttribute("class") === "flatpickr-day" || span.getAttribute("class") === "flatpickr-day today") {
          // console.log("span.arial-label -> ", span.getAttribute("aria-label"))
          return span.getAttribute("aria-label")
        }
      }
    }, strCalender)
    strCalender += ` span[aria-label="${odDateVal}"]`
    await page.waitForSelector(`${strCalender}`)
    await page.click(`${strCalender}`)
  }
  // console.log("Registration Date added successfully!")

  //? rto
  let rtoSel = "div#rto"
  await page.waitForSelector(rtoSel)
  await page.click(rtoSel)
  await waitForTimeout(500)
  await page.type(rtoSel, rto)
  await waitForTimeout(2000)
  await page.waitForSelector("#rto .css-i97cuk-menu", { visible: true })
  await page.click("#rto .css-i97cuk-menu")
  await waitForTimeout(1000)

  //? customer type auto-selected
  //   await page.waitForSelector('select[name="customerType"]', { visible: true })
  let customerTypeSel = 'select[name="customerType"]'
  await page.click('select[name="customerType"]')
  // console.log("customerType -> ", customerType)
  await chooseOptViaSelector({ page, selector: customerTypeSel, optVal: `${customerType}` || "I" })

  //   await page.waitForSelector('input[name="pincode"]')
  let pincodeSel = 'input[name="pincode"]'
  // await page.click(pincodeSel)
  await page.focus(pincodeSel)
  await page.evaluate((selector) => {
    document.querySelector(selector).value = ""
  }, pincodeSel)
  await page.type(pincodeSel, pincode)
  await waitForTimeout(1000)

  // if (isRenew) {
  let idvSel = 'input[name="idv"]'
  await page.waitForSelector(idvSel)
  await page.click(idvSel)
  await clearSelectorValue(page, idvSel)
  await page.type(idvSel, idv)
  // }

  //   console.log(await page.$('form button[type="submit"]'))
  await page.waitForSelector('form button[type="submit"]') // Replace with the actual selector for the submit button

  await page.click('form button[type="submit"]')

  if (isRenew) {
    await new Promise((resolve) => setTimeout(resolve, 20000))
  }

  let timeout = 100000
  if (isRenew) {
    timeout = 100000
  }
  // return
  let verifyKyc = "#verifyKyc" // '//*[@id="instant-quote"]/div/form/div[15]/div/button'
  await waitForTimeout(1000)
  await page.waitForSelector(verifyKyc, { visible: true, timeout: timeout })
  await page.click(verifyKyc)
  await waitForTimeout(2000)
  // console.log("Quote Page Done")
}
