export async function policyPage(page) {
  await page.waitForSelector("#AdditionalDetails")
  await new Promise((resolve) => setTimeout(resolve, 2000))

  await page.waitForSelector("#AdditionalDetails div")
  await new Promise((resolve) => setTimeout(resolve, 2000))

  await page.waitForSelector("#AdditionalDetails div form")
  await new Promise((resolve) => setTimeout(resolve, 2000))

  let engineNum = '#AdditionalDetails form input[name="engineNumber"]'
  await page.waitForSelector(engineNum)
  await page.click(engineNum)
  await page.type(engineNum, "ABCDJKLL99")

  let chassisNum = '#AdditionalDetails form input[name="chassisNumber"]'
  await page.click(chassisNum)
  await page.type(chassisNum, "MA1EC2G34H1234566")

  let regNum = '#AdditionalDetails form input[name="registrationNumber"]'
  await page.click(regNum)
  await page.type(regNum, "AB12CD3456")

  let mobNum = '#AdditionalDetails form input[name="mobileNumber"]'
  await page.click(mobNum)
  await page.type(mobNum, "9129129988")

  let address = '#AdditionalDetails form input[name="addressPrimary"]'
  await page.click(address)
  await page.type(address, "LIG colony Sector 31")

  let email = '#AdditionalDetails form input[name="email"]'
  await page.click(email)
  await page.type(email, "ankit@aegiscovenant.com")

  let gender = "#AdditionalDetails form #genderNominee0Male"
  await page.waitForSelector(gender)
  await page.click(gender)

  let nomineeName = '#AdditionalDetails form input[name="nomineeName"]'
  await page.click(nomineeName)
  await page.type(nomineeName, "Nomu")

  let nomineeAge = '#AdditionalDetails form input[name="nomineeAge"]'
  await page.click(nomineeAge)
  await page.type(nomineeAge, "24")

  let nomineeRelation = '#AdditionalDetails form select[name="nomineeRelation"]'
  await page.click(nomineeRelation)
  let relOpt = await page.evaluate(() => {
    let relSel = document.querySelector('#AdditionalDetails form select[name="nomineeRelation"]')
    let options = () => {
      for (let it of relSel.childNodes) {
        if (it.value === "Brother") {
          it.selected = "selected"
          return it.getAttribute("value")
        }
      }
    }
    return options()
  })
  await page.select(nomineeRelation, relOpt)

  let submitSel = '#AdditionalDetails form button[type="submit"]'
  await page.waitForSelector(submitSel)
  await page.click(submitSel)
  console.log("Policy Page Done")
}
