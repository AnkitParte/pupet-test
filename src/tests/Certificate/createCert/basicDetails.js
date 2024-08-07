import { chooseOptViaSelector, customDateSelector } from "../../../utils/functions.js"

export const basicDetails = async ({ page, customerType }) => {
  let customerTypeSel = 'select[name="customerType"]'
  await chooseOptViaSelector({ page, selector: customerTypeSel, optVal: customerType })

  let firstName = 'input[name="customerFirstName"]'
  if (customerType === "I") {
    let salute = 'select[name="salutation"]'
    await chooseOptViaSelector({ page, selector: salute })

    await page.click(firstName)
    await page.type(firstName, "Ankit")

    let lastName = 'input[name="customerLastName"]'
    await page.click(lastName)
    await page.type(lastName, "Parte")
  } else {
    await page.click(firstName)
    await page.type(firstName, "X-men Pvt. Ltd.")

    let gstNum = 'input[name="gstNumber"]'
    await page.click(gstNum)
    await page.type(gstNum, "28OUZAJ2291F3Z7")
  }

  let address = 'input[name="address1"]'
  await page.click(address)
  await page.type(address, "LIG colony sector 31")

  let mobile = 'input[name="mobile"]'
  await page.click(mobile)
  await page.type(mobile, "9129129988")

  let email = 'input[name="email"]'
  await page.click(email)
  await page.type(email, "ankit@aegiscovenant.com")

  let dob = 'input[name="dob"]'
  await customDateSelector({ page, selector: dob })

  let pincode = 'input[name="pincode"]'
  await page.click(pincode)
  await page.type(pincode, "122001")
}
