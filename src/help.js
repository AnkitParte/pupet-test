import { sendSlackMessage } from "./utils/slackHelper.js"

let args = process.argv.slice(2)
console.log("args -> ", args)

// await sendSlackMessage({
//   testSuiteName: "Test suite message test 1",
//   testResult: "Passed",
//   TestFor: "Create Insurance Page"
// })

await sendSlackMessage({
  testSuiteName: "Create Certificate Page",
  testResult: "Partially Passed",
  successRatio: "10/12",
  TestFor: "Create Certificate Page",
  date: "01/08/2021",
  executiveEmail: "kisame@test.com",
  dealershipName: "Tobirama Honda"
})
