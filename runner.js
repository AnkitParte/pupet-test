import { createCertTest } from "./src/tests/createCert/index.js"
import { createInsuTest } from "./src/tests/createInsu/index.js"
import {
  changeConfigInsurer,
  loginAdminApiCall
} from "./src/globals/api/adminPanelApi.js"
import { policyCancel } from "./src/tests/policyCancel/index.js"
import { policyEndorse } from "./src/tests/policyEndorse/index.js"

let insuPayload = {
  id: 7,
  vehicleType: "new",
  forCustomer: "Individual",
  customerType: "I",
  corporateType: "",
  corporateTypeId: "",
  title: "Re-New policy for Individual when expired in last 90 days",
  renewOption: "",
  status: "😢Pending",
  headlessOff: true,
  insurer: "Bajaj"
}
// await createInsuTest(insuPayload).then((res) => {
//   if (res.status) {
//     console.table([insuPayload])
//   } else {
//     console.log("Fail")
//   }
// })

// await createCertTest({
//   id: 1,
//   type: "new",
//   for: "Individual",
//   forId: "I",
//   planType: "fixed",
//   title: "New Certificate for Individual for Fixed plan",
//   status: "😢Pending",
//   headlessOff: true
// })

// await policyCancel()

// await policyEndorse()

let login = await loginAdminApiCall()
if (login?.status == 200) {
  let { accessToken } = login

  await changeConfigInsurer({ accessToken, insurer: "BAJAJ" })
}
