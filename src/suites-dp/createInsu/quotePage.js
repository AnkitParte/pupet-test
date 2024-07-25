export async function quotePage(page, isRenew) {
  //? create insurance instant-quote form fill
  // console.log(await page.$("#make"))
  await page.waitForSelector("#instant-quote")

  if (isRenew) {
    let selRenewPol = "#newPolicy1false"
    await page.waitForSelector(selRenewPol)
    await page.click(selRenewPol)

    let selVehicleNum = 'input[name="vehicleRegistrationNumb"]'
    await page.waitForSelector(selVehicleNum)
    await page.click(selVehicleNum)
    await page.type(selVehicleNum, "MP22MC8987")

    // let expr = "#policyExpiry2Expired"
    let expr = 'input[value="Expired for more than 90 days"]'
    await page.waitForSelector(expr)
    await page.click(expr)
  }
  await page.waitForSelector("div#make")
  await page.click("div#make")

  await page.waitForSelector("#make .css-i97cuk-menu", { visible: true })
  await page.click("#make .css-i97cuk-menu")

  await page.waitForSelector("div#model")
  await page.click("div#model")

  await page.waitForSelector("#model .css-i97cuk-menu", { visible: true })
  await page.click("#model .css-i97cuk-menu")

  await page.waitForSelector('select[name="variant"]', { visible: true })
  await page.click('select[name="variant"]')

  let variantOpt = await page.evaluate(() => {
    const variant = document.querySelector('select[name="variant"]')
    // console.log("variant", variant)
    let options = () => {
      for (const option of variant.childNodes) {
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

  await page.select('select[name="variant"]', variantOpt)

  //? no need if date is auto-selected
  //   await page.waitForSelector('input[name="riskStartDate"]', { visible: true })
  //   await page.click('input[name="riskStartDate"]')
  //   await page.keyboard.press("Enter")

  //? registration date selector old
  //   await page.waitForSelector('input[name="registrationDate"]', {
  //     visible: true
  //   })
  //   await page.click('input[name="registrationDate"]')
  //   await page.type('input[name="registrationDate"]', "10-07-2024")

  //? registration date select new
  // Add Registration Date
  const select_date = await page.waitForSelector('input[name="registrationDate"]', {
    visible: true
  })
  await select_date.click()
  // console.log("select date visible")
  // /html/body/div[2]/div[2]/div/div[2]/div/span[8]
  // body > div.flatpickr-calendar.animate.arrowBottom.arrowLeft.open > div.flatpickr-innerContainer > div > div.flatpickr-days > div > span:nth-child(8)
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
    let date = "html/body/div[2]/div[2]/div/div[2]/div/span[24]"
    let dateElement = await page.waitForSelector(`xpath/${date}`)
    await dateElement.click()
  }

  // console.log("Registration Date added successfully!")

  //? customer type auto-selected
  //   await page.waitForSelector('select[name="customerType"]', { visible: true })
  await page.click('select[name="customerType"]')

  let customerTypeOpt = await page.evaluate(() => {
    const variant = document.querySelector('select[name="customerType"]')
    // console.log("customerType", variant)
    let options = () => {
      for (const option of variant.childNodes) {
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
  //   console.log("customerTypeOpt", customerTypeOpt)
  await page.select('select[name="customerType"]', customerTypeOpt)

  //   await page.waitForSelector('input[name="pincode"]')
  await page.click('input[name="pincode"]')
  await page.type('input[name="pincode"]', "122001")

  if (isRenew) {
    await page.waitForSelector('input[name="idv"]')
    await page.click('input[name="idv"]')
    await page.type('input[name="idv"]', "50000")
  }

  //   console.log(await page.$('form button[type="submit"]'))
  await page.waitForSelector('form button[type="submit"]') // Replace with the actual selector for the submit button

  await page.click('form button[type="submit"]')

  if (isRenew) {
    await new Promise((resolve) => setTimeout(resolve, 20000))
  }

  let timeout = 30000
  if (isRenew) {
    timeout = 80000
  }
  let verifyKyc = "#verifyKyc" // '//*[@id="instant-quote"]/div/form/div[15]/div/button'
  await page.waitForSelector(verifyKyc, { visible: true, timeout: timeout })
  await page.click(verifyKyc)
  console.log("Quote Page Done")
}
