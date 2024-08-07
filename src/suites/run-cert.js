import { createCertTest } from "../tests/Certificate/createCert/index.js"
import { htmlOutput } from "../utils/outputHelper.js"
import { postToSlackChannel } from "../utils/postToSlack.js"
import { certSuitesPayload, payloadNewCorp, payloadNewIndividual, payloadReNewCorp, payloadReNewIndividual } from "./suitePayload/certSuitePayload.js"
import fs from "fs"
import dotenv from "dotenv"
dotenv.config({ path: "../../.env" })

const runTests = async (payload) => {
  const promises = payload.map(async (item, idx) => {
    const res = await createCertTest(item)
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
    delete item.id
    delete item.type
    delete item.for
    delete item.forId
    delete item.planType
    return item
  })
  // Print the table after all promises have resolved
  console.table(payload)
  return payload
}

// await runTests(certSuitesPayload)
let one = await runTests(payloadNewIndividual)

let two = await runTests(payloadReNewIndividual)

let three = await runTests(payloadNewCorp)

let four = await runTests(payloadReNewCorp)

let res = [...one, ...two, ...three, ...four]

if (process.env.DO_SLACK == "true") {
  console.log("Doing Slack")
  let suiteName = "Create-Certificate"
  let suiteTitle = "Certificate-All-Types-Testing"
  await postToSlackChannel(res, suiteName, suiteTitle)
}

// let htmlOut = htmlOutput("Policy Testing Report", res)
// let filePath = "newCertTestOut.html"
// fs.writeFile(filePath, htmlOut, (err) => {
//   if (err) {
//     return console.log(`Error writing file: ${err}`)
//   }
//   console.log(`File created successfully at ${filePath}`)
// })
