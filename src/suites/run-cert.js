import { createCertTest } from "../suites-dp/createCert/index.js"
import { certSuitesPayload, payloadNewCorp, payloadNewIndividual, payloadReNewCorp, payloadReNewIndividual } from "./suitePayload/certSuitePayload.js"

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

await runTests(certSuitesPayload)

// await runTests(payloadNewIndividual)

// await runTests(payloadReNewIndividual)

// await runTests(payloadNewCorp)

// await runTests(payloadReNewCorp)
