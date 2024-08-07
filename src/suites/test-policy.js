import { createInsuTest } from "../tests/Insurance/createInsu/index.js"
import { changeConfigInsurer, loginAdminApiCall } from "../globals/api/adminPanelApi.js"
import { policyCancel } from "../tests/Insurance/policyCancel/index.js"
import { policyEndorse } from "../tests/Insurance/policyEndorse/index.js"
import { postToSlackChannel } from "../utils/postToSlack.js"
import { mixedPolicySuitesPayload } from "./suitePayload/policySuitePayload.js"
import dotenv from "dotenv"
dotenv.config({ path: "../../.env" })

let adminLogin = await loginAdminApiCall()
let accessToken

const runTests = async (accessToken) => {
  // For United
  let unitedPolicyLoad = mixedPolicySuitesPayload?.[0]
  const unitedInsurer = await changeConfigInsurer({ accessToken, insurer: unitedPolicyLoad?.insurer })
  let unitedPolicy
  if (unitedInsurer?.status == 200) {
    unitedPolicy = await createInsuTest(unitedPolicyLoad)
    if (unitedPolicy?.status) {
      unitedPolicyLoad.status = "✅ Succeed"
    } else {
      unitedPolicyLoad.status = "❌ Failed"
      unitedPolicyLoad.message = unitedPolicy?.message
      // unitedPolicyLoad.errorJson = unitedPolicyLoad?.errorJson
    }
  }

  // For Shri ram
  let shriRamPolicyLoad = mixedPolicySuitesPayload?.[1]
  const shriRamInsurer = await changeConfigInsurer({ accessToken, insurer: shriRamPolicyLoad?.insurer })
  let shriRamPolicy
  if (shriRamInsurer?.status == 200) {
    shriRamPolicy = await createInsuTest(shriRamPolicyLoad)
    if (shriRamPolicy?.status) {
      shriRamPolicyLoad.status = "✅ Succeed"
    } else {
      shriRamPolicyLoad.status = "❌ Failed"
      shriRamPolicyLoad.message = shriRamPolicy?.message
      // unitedPolicyLoad.errorJson = unitedPolicyLoad?.errorJson
    }
  }

  // For Tata
  let tataPolicyLoad = mixedPolicySuitesPayload?.[2]
  const tataInsurer = await changeConfigInsurer({ accessToken, insurer: tataPolicyLoad?.insurer })
  let tataPolicy
  if (tataInsurer?.status == 200) {
    tataPolicy = await createInsuTest(tataPolicyLoad)
    if (tataPolicy?.status) {
      tataPolicyLoad.status = "✅ Succeed"
    } else {
      tataPolicyLoad.status = "❌ Failed"
      tataPolicyLoad.message = tataPolicy?.message
      // unitedPolicyLoad.errorJson = unitedPolicyLoad?.errorJson
    }
  }

  // For ICICI
  let iciciPolicyLoad = mixedPolicySuitesPayload?.[3]
  const iciciInsurer = await changeConfigInsurer({ accessToken, insurer: iciciPolicyLoad?.insurer })
  let iciciPolicy
  if (iciciInsurer?.status == 200) {
    iciciPolicy = await createInsuTest(iciciPolicyLoad)
    if (iciciPolicy?.status) {
      iciciPolicyLoad.status = "✅ Succeed"
    } else {
      iciciPolicyLoad.status = "❌ Failed"
      iciciPolicyLoad.message = iciciPolicy?.message
      // unitedPolicyLoad.errorJson = unitedPolicyLoad?.errorJson
    }
  }

  // For Bajaj
  let bajajPolicyLoad = mixedPolicySuitesPayload?.[4]
  const bajajInsurer = await changeConfigInsurer({ accessToken, insurer: bajajPolicyLoad?.insurer })
  let bajajPolicy
  if (bajajInsurer?.status == 200) {
    bajajPolicy = await createInsuTest(bajajPolicyLoad)
    if (bajajPolicy?.status) {
      bajajPolicyLoad.status = "✅ Succeed"
    } else {
      bajajPolicyLoad.status = "❌ Failed"
      bajajPolicyLoad.message = bajajPolicy?.message
      // unitedPolicyLoad.errorJson = unitedPolicyLoad?.errorJson
    }
  }

  // For United Renew
  let unitedPolicyLoadRenew = mixedPolicySuitesPayload?.[5]
  const unitedInsurerRenew = await changeConfigInsurer({ accessToken, insurer: unitedPolicyLoadRenew?.insurer })
  let unitedPolicyRenew
  if (unitedInsurerRenew?.status == 200) {
    unitedPolicyRenew = await createInsuTest(unitedPolicyLoad)
    if (unitedPolicyRenew?.status) {
      unitedPolicyLoadRenew.status = "✅ Succeed"
    } else {
      unitedPolicyLoadRenew.status = "❌ Failed"
      unitedPolicyLoadRenew.message = unitedPolicyRenew?.message
      // unitedPolicyLoadRenew.errorJson = unitedPolicyLoad?.errorJson
    }
  }

  let policyEndorseRes = await policyEndorse({ headless: true })
  let policyEndorseLoad = {
    id: 6,
    title: "Policy Endorsement Process",
    insurer: "All"
  }
  if (policyEndorseRes?.status) {
    policyEndorseLoad.status = "✅ Succeed"
  } else {
    policyEndorseLoad.status = "❌ Failed"
    policyEndorseLoad.message = policyEndorseRes?.message
  }

  let policyCancelRes = await policyCancel({ headless: true })
  let policyCancelLoad = {
    id: 6,
    title: "Policy Cancellation Process",
    insurer: "All"
  }
  if (policyCancelRes?.status) {
    policyCancelLoad.status = "✅ Succeed"
  } else {
    policyCancelLoad.status = "❌ Failed"
    policyCancelLoad.message = policyCancelRes?.message
  }
  let res = [
    unitedPolicyLoad,
    shriRamPolicyLoad,
    tataPolicyLoad,
    iciciPolicyLoad,
    bajajPolicyLoad,
    unitedPolicyLoadRenew,
    policyEndorseLoad,
    policyCancelLoad
  ]
  res = res.map((item) => {
    delete item?.customerType
    delete item?.corporateType
    delete item?.corporateTypeId
    delete item?.id
    delete item?.renewOption
    delete item?.forCustomer
    delete item?.vehicleType
    delete item?.bikeDetails
    delete item?.headlessOff
    return item
  })
  console.table(res)
  return res
}
if (adminLogin.status == 200) {
  accessToken = adminLogin.accessToken
  console.log("Admin login done")
  let res = await runTests(accessToken)
  console.log("doSlackVar -> ", process.env.DO_SLACK)
  if (process.env.DO_SLACK == "true") {
    console.log("Doing Slack")
    let suiteName = "Ds-Policy-Testing" // directory name in s3
    let suiteTitle = "Policy-Create-Endorse-Cancel" // name of file in s3 directory
    await postToSlackChannel(res, suiteName, suiteTitle)
  }
} else {
  console.log("Admin login failed")
}
