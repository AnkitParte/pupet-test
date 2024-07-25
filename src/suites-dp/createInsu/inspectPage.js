import { waitForTimeout } from "../../utils/functions.js"

export async function inspectionPage(page) {
  await page.waitForSelector("#Inspection")

  let pngFile = "/Users/ankitparte/ActiveProject/testing-pup/src/suites-dp/files/tempSS.png"

  let inspectReport = await page.waitForSelector('input[name="inspectionReport"]')
  await inspectReport.uploadFile(pngFile)

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

  let submitSel = '#Inspection form button[type="submit"]'
  await page.waitForSelector(submitSel)
  await page.click(submitSel)
  console.log("Inspection page done")
}
