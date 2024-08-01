import { createInsuTest } from "../suites-dp/createInsu/index.js"
import { htmlOutput } from "../utils/outputHelper.js"
import {
  payloadReNewForExpired90DaysAgo,
  payloadReNewForExpiringIn90,
  payloadReNewForI,
  payloadReNewForNoExpiry,
  policySuitesPayload,
  payloadNewPolicy
} from "./suitePayload/policySuitePayload.js"
import fs from "fs"

const runTests = async (payload) => {
  const promises = payload.map(async (item, idx) => {
    // console.log("item -> ", item)
    const res = await createInsuTest(item)
    if (res?.status) {
      payload[idx].status = "✅ Succeed"
    } else {
      payload[idx].status = "❌ Failed"
      payload[idx].message = res?.message
      // payload[idx].errorJson = res?.errorJson
    }
  })

  // Wait for all promises to complete
  await Promise.all(promises)

  // Print the table after all promises have resolved
  let logThis = payload.map((item) => {
    delete item.customerType
    delete item.corporateType
    delete item.corporateTypeId
    delete item.id
    delete item.renewOption
    delete item.forCustomer
    delete item.vehicleType
    return item
  })
  console.table(logThis)
  return logThis
}

// await runTests(policySuitesPayload)

let one = await runTests(payloadNewPolicy)
let two = await runTests(payloadReNewForI)
let three = await runTests(payloadReNewForNoExpiry)
let four = await runTests(payloadReNewForExpiringIn90)
let five = await runTests(payloadReNewForExpired90DaysAgo)

let res = [...one, ...two, ...three, ...four, ...five]

let htmlOut = htmlOutput("Policy Testing Report", res)
let filePath = "newPolicyTestOut.html"
fs.writeFile(filePath, htmlOut, (err) => {
  if (err) {
    return console.log(`Error writing file: ${err}`)
  }
  console.log(`File created successfully at ${filePath}`)
})
