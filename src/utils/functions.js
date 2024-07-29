export const waitForTimeout = async (delay) => {
  return await new Promise((resolve) => setTimeout(resolve, delay || 1000))
}

const selectDropdownOptionByLabel = async (page, selector, value, minOptions = 2) => {
  await page.waitForSelector(selector)
  const getDropdownValueByLabel = async (selector, value) =>
    await page.evaluate(
      (selector, value) => {
        const makes = document.querySelector(selector)

        for (const option of makes.childNodes) {
          if (option.value && option.innerText.replace(/\s/g, "").toLowerCase() === value.replace(/\s/g, "").toLowerCase()) {
            option.selected = "selected"
            return option.getAttribute("value")
          }
        }
      },
      selector,
      value
    )

  await dropdownOptionsLoaded(page, selector, minOptions)
  const optionValue = await getDropdownValueByLabel(selector, value)
  if (!optionValue) console.info({ selector, value })
  await page.select(selector, optionValue)
}

export const chooseOptViaSelector = async ({ page, selector, optVal = "" }) => {
  let selectTag = selector
  await page.click(selectTag)

  let chosenOpt = await page.evaluate(
    (selector, optVal) => {
      let itemSel = document.querySelector(selector)
      let options = () => {
        for (let it of itemSel.childNodes) {
          if (optVal && it.getAttribute("value") && optVal == it.getAttribute("value")) {
            it.selected = "selected"
            return it.getAttribute("value")
          } else if (!optVal && it.getAttribute("value")) {
            it.selected = "selected"
            return it.getAttribute("value")
          }
        }
      }
      return options()
    },
    selector,
    optVal
  )

  await page.select(selectTag, chosenOpt)
}

export const customDateSelector = async ({ page, selector }) => {
  await page.click(selector)
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
}

export const clearSelectorValue = async (page, inputSelector) => {
  await page.evaluate((selector) => {
    document.querySelector(selector).value = ""
  }, inputSelector)
}
