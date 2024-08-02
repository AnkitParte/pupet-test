import { dealershipExecutive } from "../loginCreds/index.js"
import { sendSlackMessage } from "./slackHelper.js"
import { uploadToS3 } from "./uploadToS3.js"

export const postToSlackChannel = async (listOfTestResult, suiteName, suiteTitle) => {
  let { email, dealershipName } = dealershipExecutive
  let timeOfTest = new Date().toLocaleString() + ""
  let testResultStr = "Failed"
  let count = 0
  for (let item of listOfTestResult) {
    if (item.status.includes("Succeed")) {
      count++
    }
  }
  let successRate = Math.floor((count / listOfTestResult.length) * 100) + "%"
  if (count == listOfTestResult.length) {
    testResultStr = "Passed"
  } else if (count == 0) {
    testResultStr = "Failed"
  } else {
    testResultStr = "Partially Passed"
  }
  let htmlFile = htmlOutput(`${suiteName} Report`, listOfTestResult)
  let uploadToS3Url = await uploadToS3(htmlFile, suiteName, suiteTitle)
  let payload = {
    testSuiteName: suiteName,
    testResult: testResultStr,
    successRatio: count + " / " + listOfTestResult.length,
    successRate: successRate,
    date: timeOfTest,
    executiveEmail: email || "kisame@test.com",
    dealershipName: dealershipName || "Tobirama Honda",
    reportUrl: uploadToS3Url
  }
  try {
    let res = await sendSlackMessage(payload)
    // console.log("Slack Done")
  } catch (e) {
    console.log("error in slack api call", e)
  }
}
