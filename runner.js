import { createCertTest } from "./src/tests/createCert/index.js"
import { createInsuTest } from "./src/tests/createInsu/index.js"

// await createInsuTest({
//   id: 7,
//   vehicleType: "new",
//   forCustomer: "Individual",
//   customerType: "I",
//   corporateType: "",
//   corporateTypeId: "",
//   title: "Re-New policy for Individual when expired in last 90 days",
//   renewOption: "1",
//   status: "😢Pending",
//   headlessOff: true
// })

await createCertTest({
  id: 1,
  type: "new",
  for: "Individual",
  forId: "I",
  planType: "fixed",
  title: "New Certificate for Individual for Fixed plan",
  status: "😢Pending",
  headlessOff: true
})
