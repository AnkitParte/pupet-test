import { createCertTest } from "../suites-dp/createCert/index.js"
import { htmlOutput } from "../utils/outputHelper.js"
import { certSuitesPayload, payloadNewCorp, payloadNewIndividual, payloadReNewCorp, payloadReNewIndividual } from "./suitePayload/certSuitePayload.js"
import fs from "fs"

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
  console.table(payload)
}

// await runTests(certSuitesPayload)

let one = await runTests(payloadNewIndividual)

let two = await runTests(payloadReNewIndividual)

let three = await runTests(payloadNewCorp)

let four = await runTests(payloadReNewCorp)

let res = [...one, ...two, ...three, ...four]
let htmlOut = htmlOutput("Policy Testing Report", res)
let filePath = "newCertTestOut.html"
fs.writeFile(filePath, htmlOut, (err) => {
  if (err) {
    return console.log(`Error writing file: ${err}`)
  }
  console.log(`File created successfully at ${filePath}`)
})
