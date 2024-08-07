import { BAJAJ, ICICI, SHRI_RAM, TATA, UNITED } from "../../utils/constants.js"

export let payloadNewPolicy = [
  {
    id: 1,
    vehicleType: "new",
    forCustomer: "Individual",
    customerType: "I",
    corporateType: "",
    corporateTypeId: "",
    title: "New policy for Individual",
    renewOption: "none",
    status: "😢Pending"
  },
  {
    id: 2,
    vehicleType: "new",
    forCustomer: "Corporate",
    customerType: "C",
    corporateType: "Proprietor",
    corporateTypeId: "1",
    title: "New policy for Corporate-Proprietor",
    renewOption: "none",
    status: "😢Pending"
  },
  {
    id: 3,
    vehicleType: "new",
    forCustomer: "Corporate",
    customerType: "C",
    corporateType: "Partnership",
    corporateTypeId: "2",
    title: "New policy for Corporate-Partnership",
    renewOption: "none",
    status: "😢Pending"
  },
  {
    id: 4,
    vehicleType: "new",
    forCustomer: "Corporate",
    customerType: "C",
    corporateType: "Public",
    corporateTypeId: "3",
    title: "New policy for Corporate-Public",
    renewOption: "none",
    status: "😢Pending"
  },
  {
    id: 5,
    vehicleType: "new",
    forCustomer: "Corporate",
    customerType: "C",
    corporateType: "Private",
    corporateTypeId: "4",
    title: "New policy for Corporate-Private",
    renewOption: "none",
    status: "😢Pending"
  }
]

export let payloadReNewForI = [
  {
    id: 6,
    vehicleType: "renew",
    forCustomer: "Individual",
    customerType: "I",
    corporateType: "",
    corporateTypeId: "",
    title: "Re-New policy for Individual when not-expired",
    renewOption: "none",
    status: "😢Pending"
  },
  {
    id: 7,
    vehicleType: "renew",
    forCustomer: "Individual",
    customerType: "I",
    corporateType: "",
    corporateTypeId: "",
    title: "Re-New policy for Individual when expired in last 90 days",
    renewOption: "1",
    status: "😢Pending"
  },
  {
    id: 8,
    vehicleType: "renew",
    forCustomer: "Individual",
    customerType: "I",
    corporateType: "",
    corporateTypeId: "",
    title: "Re-New policy for Individual when expired for more than 90 days",
    renewOption: "2",
    status: "😢Pending"
  }
]

export let payloadReNewForNoExpiry = [
  {
    id: 9,
    vehicleType: "renew",
    forCustomer: "Corporate",
    customerType: "C",
    corporateType: "Proprietor",
    corporateTypeId: "1",
    title: "Re-New policy for Corporate when not-expired for Proprietor",
    renewOption: "none",
    status: "😢Pending"
  },
  {
    id: 10,
    vehicleType: "renew",
    forCustomer: "Corporate",
    customerType: "C",
    corporateType: "Partnership",
    corporateTypeId: "2",
    title: "Re-New policy for Corporate when not-expired for Partnership",
    renewOption: "none",
    status: "😢Pending"
  },
  {
    id: 11,
    vehicleType: "renew",
    forCustomer: "Corporate",
    customerType: "C",
    corporateType: "Public",
    corporateTypeId: "3",
    title: "Re-New policy for Corporate when not-expired for Public",
    renewOption: "none",
    status: "😢Pending"
  },
  {
    id: 12,
    vehicleType: "renew",
    forCustomer: "Corporate",
    customerType: "C",
    corporateType: "Private",
    corporateTypeId: "4",
    title: "Re-New policy for Corporate when not-expired for Private",
    renewOption: "none",
    status: "😢Pending"
  }
]

export let payloadReNewForExpiringIn90 = [
  {
    id: 13,
    vehicleType: "renew",
    forCustomer: "Corporate",
    customerType: "C",
    corporateType: "Proprietor",
    corporateTypeId: "1",
    title: "Re-New policy for Corporate when expiring in 90 days for Proprietor",
    renewOption: "1",
    status: "😢Pending"
  },
  {
    id: 14,
    vehicleType: "renew",
    forCustomer: "Corporate",
    customerType: "C",
    corporateType: "Partnership",
    corporateTypeId: "2",
    title: "Re-New policy for Corporate when expiring in 90 days for Partnership",
    renewOption: "1",
    status: "😢Pending"
  },
  {
    id: 15,
    vehicleType: "renew",
    forCustomer: "Corporate",
    customerType: "C",
    corporateType: "Public",
    corporateTypeId: "3",
    title: "Re-New policy for Corporate when expiring in 90 days for Public",
    renewOption: "1",
    status: "😢Pending"
  },
  {
    id: 16,
    vehicleType: "renew",
    forCustomer: "Corporate",
    customerType: "C",
    corporateType: "Private",
    corporateTypeId: "4",
    title: "Re-New policy for Corporate when expiring in 90 days for Private",
    renewOption: "1",
    status: "😢Pending"
  }
]

export let payloadReNewForExpired90DaysAgo = [
  {
    id: 17,
    vehicleType: "renew",
    forCustomer: "Corporate",
    customerType: "C",
    corporateType: "Proprietor",
    corporateTypeId: "1",
    title: "Re-New policy for Corporate when expired more than 90 days ago",
    renewOption: "2",
    status: "😢Pending"
  },
  {
    id: 18,
    vehicleType: "renew",
    forCustomer: "Corporate",
    customerType: "C",
    corporateType: "Partnership",
    corporateTypeId: "2",
    title: "Re-New policy for Corporate when expired more than 90 days ago",
    renewOption: "2",
    status: "😢Pending"
  },
  {
    id: 19,
    vehicleType: "renew",
    forCustomer: "Corporate",
    customerType: "C",
    corporateType: "Public",
    corporateTypeId: "3",
    title: "Re-New policy for Corporate when expired more than 90 days ago",
    renewOption: "2",
    status: "😢Pending"
  },
  {
    id: 20,
    vehicleType: "renew",
    forCustomer: "Corporate",
    customerType: "C",
    corporateType: "Private",
    corporateTypeId: "4",
    title: "Re-New policy for Corporate when expired more than 90 days ago",
    renewOption: "2",
    status: "😢Pending"
  }
]
export let policySuitesPayload = [
  ...payloadNewPolicy,
  ...payloadReNewForI,
  ...payloadReNewForNoExpiry,
  ...payloadReNewForExpiringIn90,
  ...payloadReNewForExpired90DaysAgo
]

export let mixedPolicySuitesPayload = [
  {
    id: 1,
    vehicleType: "new",
    forCustomer: "Individual",
    customerType: "I",
    corporateType: "",
    corporateTypeId: "",
    title: "New policy for Individual",
    renewOption: "none",
    status: "😢Pending",
    insurer: UNITED,
    bikeDetails: {
      make: "hero motocorp",
      model: "destini",
      rto: "hr26",
      pincode: "122005",
      idv: "84500"
    },
    headlessOff: false
  },
  {
    id: 3,
    vehicleType: "new",
    forCustomer: "Corporate",
    customerType: "C",
    corporateType: "Partnership",
    corporateTypeId: "2",
    title: "New policy for Corporate-Partnership",
    renewOption: "none",
    status: "😢Pending",
    insurer: SHRI_RAM,
    bikeDetails: {
      make: "honda",
      model: "activa",
      rto: "ka44",
      pincode: "572218",
      idv: "85600"
    },
    headlessOff: false
  },
  {
    id: 4,
    vehicleType: "new",
    forCustomer: "Corporate",
    customerType: "C",
    corporateType: "Public",
    corporateTypeId: "3",
    title: "New policy for Corporate-Public",
    renewOption: "none",
    status: "😢Pending",
    insurer: TATA,
    bikeDetails: {
      make: "suzuki",
      model: "access",
      rto: "od25",
      pincode: "761118",
      idv: "82824"
    },
    headlessOff: false
  },
  {
    id: 5,
    vehicleType: "new",
    forCustomer: "Corporate",
    customerType: "C",
    corporateType: "Private",
    corporateTypeId: "4",
    title: "New policy for Corporate-Private",
    renewOption: "none",
    status: "😢Pending",
    insurer: ICICI,
    bikeDetails: {
      make: "yamaha",
      model: "fascino",
      rto: "up11",
      pincode: "247001",
      idv: "76876"
    },
    headlessOff: false
  },
  {
    id: 2,
    vehicleType: "new",
    forCustomer: "Corporate",
    customerType: "C",
    corporateType: "Proprietor",
    corporateTypeId: "1",
    title: "New policy for Corporate-Proprietor",
    renewOption: "none",
    status: "😢Pending",
    insurer: BAJAJ,
    bikeDetails: {
      make: "hero motocorp",
      model: "destini",
      rto: "gj19",
      pincode: "395620",
      idv: "74195"
    },
    headlessOff: false
  },
  {
    id: 6,
    vehicleType: "renew",
    forCustomer: "Individual",
    customerType: "I",
    corporateType: "",
    corporateTypeId: "",
    title: "Re-New policy for Individual when not-expired",
    renewOption: "2",
    status: "😢Pending",
    insurer: UNITED,
    bikeDetails: {
      make: "hero motocorp",
      model: "destini",
      rto: "hr26",
      pincode: "122005",
      idv: "84500"
    },
    headlessOff: false
  }
]
