import { waitForTimeout } from "../../utils/functions.js"

export const vehicleDetails = async ({ page }) => {
  await page.waitForSelector("div#make")
  await page.click("div#make")
  await page.waitForSelector("#make .css-i97cuk-menu", { visible: true })
  await page.click("#make .css-i97cuk-menu")
  await waitForTimeout(500)

  await page.waitForSelector("div#model")
  await page.click("div#model")
  await page.waitForSelector("#model .css-i97cuk-menu", { visible: true })
  await page.click("#model .css-i97cuk-menu")
  await waitForTimeout(500)

  await page.waitForSelector("div#vehicleVariant")
  await page.click("div#vehicleVariant")
  await page.waitForSelector("#vehicleVariant .css-i97cuk-menu", { visible: true })
  await page.click("#vehicleVariant .css-i97cuk-menu")
  await waitForTimeout(500)

  let engineNum = 'input[name="engineNumber"]'
  await page.click(engineNum)
  await page.type(engineNum, "ABCDE12345")

  let chassisNum = 'input[name="chassisNumber"]'
  let randomChassisNum = "MA1EC2G34H120" + Math.floor(Math.random() * 100000)
  await page.click(chassisNum)
  await page.type(chassisNum, randomChassisNum)

  let regNum = 'input[name="registrationNumber"]'
  let randomRegNum = "MP22MC" + Math.floor(Math.random() * 10000)
  await page.click(regNum)
  await page.type(regNum, randomRegNum)
}
