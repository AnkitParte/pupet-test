import { waitForTimeout } from "../../utils/functions.js"

export async function inspectionPage(page, customerType) {
  await page.waitForSelector("#Inspection")

  let pngFile = "/Users/ankitparte/ActiveProject/testing-pup/src/suites-dp/files/tempSS.png"
  let jpgFile = "/Users/ankitparte/ActiveProject/testing-pup/src/suites-dp/files/tree.jpeg"

  let front = await page.waitForSelector('input[name="front"]')
  await front.uploadFile(pngFile)

  let right = await page.waitForSelector('input[name="right"]')
  await right.uploadFile(pngFile)

  let left = await page.waitForSelector('input[name="left"]')
  await left.uploadFile(pngFile)

  let rear = await page.waitForSelector('input[name="rear"]')
  await rear.uploadFile(pngFile)

  let odoMeter = await page.waitForSelector('input[name="odometer"]')
  await odoMeter.uploadFile(pngFile)

  let chassisNum = await page.waitForSelector("#chassisNumber")
  await chassisNum.uploadFile(pngFile)

  let agentPhoto = await page.waitForSelector('input[name="agentNewspaper"]')
  await agentPhoto.uploadFile(pngFile)

  let inspectReport = await page.waitForSelector('input[name="inspectionReport"]')
  await inspectReport.uploadFile(jpgFile)

  let submitSel = '#Inspection form button[type="submit"]'
  await page.waitForSelector(submitSel)
  await page.click(submitSel)
  await waitForTimeout(2000)
  console.log("Inspection page done")
}
