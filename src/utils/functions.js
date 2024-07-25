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
