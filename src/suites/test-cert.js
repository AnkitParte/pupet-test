import { createCertTest } from "../tests/Certificate/createCert/index.js"
import { postToSlackChannel } from "../utils/postToSlack.js"
import dotenv from "dotenv"
dotenv.config({ path: "../../.env" })
import { newCertForC, newCertForI } from "./suitePayload/certSuitePayload.js"
import { certEndorse } from "../tests/Certificate/certEndorse/index.js"
import { certCancel } from "../tests/Certificate/certCancel/index.js"

const runTests = async () => {
  // let res = []
  let newIndividualFixed = await createCertTest(newCertForI)
  let resNewCertI = {
    id: 1,
    title: "New Certificate for Individual for Fixed plan",
    status: "😢Pending"
  }
  if (newIndividualFixed?.status) {
    resNewCertI.status = "✅ Succeed"
  } else {
    resNewCertI.status = "❌ Failed"
    resNewCertI.message = newIndividualFixed?.message
  }
  let newCorporateFixed = await createCertTest(newCertForC)
  let resNewCertC = {
    id: 2,
    title: "New Certificate for Corporate for Fixed plan",
    status: "😢Pending"
  }
  if (newCorporateFixed?.status) {
    resNewCertC.status = "✅ Succeed"
  } else {
    resNewCertC.status = "❌ Failed"
    resNewCertC.message = newCorporateFixed?.message
  }

  let endorseCert = await certEndorse({ headless: true }) // pass {headless: true} to not open browser
  let resEndorseCert = {
    id: 1,
    title: "Certificate Endorsement",
    status: "😢Pending"
  }
  if (endorseCert?.status) {
    resEndorseCert.status = "✅ Succeed"
  } else {
    resEndorseCert.status = "❌ Failed"
    resEndorseCert.message = endorseCert?.message
  }

  let cancelCert = await certCancel({ headless: true }) // pass {headless: true} to not open browser
  let resCancelCert = {
    id: 1,
    title: "Certificate Cancellation",
    status: "😢Pending"
  }
  if (cancelCert?.status) {
    resCancelCert.status = "✅ Succeed"
  } else {
    resCancelCert.status = "❌ Failed"
    resCancelCert.message = cancelCert?.message
  }
  let res = [resNewCertI, resNewCertC, resEndorseCert, resCancelCert]
  console.table(res)
  return res
  //   let res = [newIndividualFixed, newCorporateFixed, endorseCert, cancelCert]?.map()
}

let res = await runTests()

console.log("doSlackVar -> ", process.env.DO_SLACK)
if (process.env.DO_SLACK == "true") {
  console.log("Doing Slack")
  let suiteName = "Ds-Certificate-Testing" // directory name in s3
  let suiteTitle = "Certificate-Create-Endorse-Cancel" // name of file in s3 directory
  await postToSlackChannel(res, suiteName, suiteTitle)
}
