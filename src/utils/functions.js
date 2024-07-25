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
  let prevOd = selector
  await page.click(prevOd)
  let prevOdOpt = await page.evaluate(
    (selector, optVal) => {
      let itemSel = document.querySelector(selector)
      let options = () => {
        for (let it of itemSel.childNodes) {
          if (optVal && it?.value && optVal == it?.value) {
            it.selected = "selected"
            return it.getAttribute("value")
          } else if (it?.value) {
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
  await page.select(prevOd, prevOdOpt)
}
