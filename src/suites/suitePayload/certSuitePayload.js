export let payloadNewIndividual = [
  {
    id: 1,
    type: "new",
    for: "Individual",
    forId: "I",
    planType: "fixed",
    title: "New Certificate for Individual for Fixed plan",
    status: "😢Pending"
  },
  {
    id: 2,
    type: "new",
    for: "Individual",
    forId: "I",
    planType: "dynamic",
    title: "New Certificate for Individual for Dynamic plan",
    status: "😢Pending"
  },
  {
    id: 3,
    type: "new",
    for: "Individual",
    forId: "I",
    planType: "special",
    title: "New Certificate for Individual for Special plan",
    status: "😢Pending"
  }
]

export let payloadReNewIndividual = [
  {
    id: 4,
    type: "renew",
    for: "Individual",
    forId: "I",
    planType: "fixed",
    title: "Re-New Certificate for Individual for Fixed plan",
    status: "😢Pending"
  },
  {
    id: 5,
    type: "renew",
    for: "Individual",
    forId: "I",
    planType: "dynamic",
    title: "Re-New Certificate for Individual for Dynamic plan",
    status: "😢Pending"
  },
  {
    id: 6,
    type: "renew",
    for: "Individual",
    forId: "I",
    planType: "special",
    title: "Re-New Certificate for Individual for Special plan",
    status: "😢Pending"
  }
]

export let payloadNewCorp = [
  {
    id: 7,
    type: "new",
    for: "Corporate",
    forId: "C",
    planType: "fixed",
    title: "New Certificate for Corporate for Fixed plan",
    status: "😢Pending"
  },
  {
    id: 8,
    type: "new",
    for: "Corporate",
    forId: "C",
    planType: "dynamic",
    title: "New Certificate for Corporate for Dynamic plan",
    status: "😢Pending"
  },
  {
    id: 9,
    type: "new",
    for: "Corporate",
    forId: "C",
    planType: "special",
    title: "New Certificate for Corporate for Special plan",
    status: "😢Pending"
  }
]

export let payloadReNewCorp = [
  {
    id: 10,
    type: "renew",
    for: "Corporate",
    forId: "C",
    planType: "fixed",
    title: "Re-New Certificate for Corporate for Fixed plan",
    status: "😢Pending"
  },
  {
    id: 11,
    type: "renew",
    for: "Corporate",
    forId: "C",
    planType: "dynamic",
    title: "Re-New Certificate for Corporate for Dynamic plan",
    status: "😢Pending"
  },
  {
    id: 12,
    type: "renew",
    for: "Corporate",
    forId: "C",
    planType: "special",
    title: "Re-New Certificate for Corporate for Special plan",
    status: "😢Pending"
  }
]

export let certSuitesPayload = [...payloadNewIndividual, ...payloadReNewIndividual, ...payloadNewCorp, ...payloadReNewCorp]

export let newCertForI = {
  id: 1,
  type: "new",
  for: "Individual",
  forId: "I",
  planType: "fixed",
  title: "New Certificate for Individual for Fixed plan",
  status: "😢Pending",
  headless: true
}

export let newCertForC = {
  id: 7,
  type: "new",
  for: "Corporate",
  forId: "C",
  planType: "fixed",
  title: "New Certificate for Corporate for Fixed plan",
  status: "😢Pending",
  headless: true
}
