import puppeteer from "puppeteer"
import { FE_URL } from "../utils/constants.js"
import { waitForTimeout } from "../utils/functions.js"

// Function to generate a random email
function generateRandomEmail(baseEmail, domain) {
  const randomNumber = Math.floor(Math.random() * 1000) + 1 // Random number between 1 and 1000
  const [username, _] = baseEmail.split("@")
  return `${username}+${randomNumber}@${domain}`
}
;(async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: false,
    slowMo: 20,
    // executablePath: "/opt/homebrew/bin/chromium",
    ignoreHTTPSErrors: true,
    defaultViewport: null
  })
  const page = await browser.newPage()

  // Navigate to the login page
  await page.goto(FE_URL.ops)
  console.log("Successfully went through the url")

  // Wait for the email input field to be visible
  await page.waitForSelector('input[type="email"]', {
    visible: true,
    timeout: 6000
  })

  // Clear and type the email address
  await page.evaluate(() => (document.querySelector('input[type="email"]').value = ""))
  await page.type('input[type="email"]', "arpita@aegiscovenant.com")

  // Clear and type the password
  await page.evaluate(() => (document.querySelector('input[type="password"]').value = ""))
  await page.type('input[type="password"]', "Arpita828!")

  // Wait for the "Sign in" button to be visible
  await page.waitForSelector('button[type="submit"]', {
    visible: true,
    timeout: 6000
  })
  // Click the "Sign in" button
  await page.click('button[type="submit"]')
  console.log("Successfully logged in!")

  // Add a delay to allow for any post-login processes
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Wait for the Top-Up element using XPath
  const dealerCreation = '//*[@id="root"]/div[1]/div[1]/div[3]/ul/li[3]/a/span'
  const element = await page.waitForSelector(`xpath/${dealerCreation}`)
  await element.click()
  console.log("Clicked on Create Dealer")
  {
    // Fill name
    await page.waitForSelector('input[name="name"]')
    await page.click('input[name="name"]')
    await page.type('input[name="name"]', " Test Master Dealer ")
    console.log("Name Added Successfully!")

    // Fill Legal Name
    await page.waitForSelector('input[name="legalName"]')
    await page.click('input[name="legalName"]')
    await page.type('input[name="legalName"]', "Test Master Dealer")
    console.log("Legal Name Added Successfully!")

    // Fill Email
    //await page.waitForSelector('input[name="email"]')
    //await page.click('input[name="email"]')
    //await page.type('input[name="email"]', "masterdealer@test.com")
    //console.log("Email Added Successfully!")

    const randomDealerEmail = generateRandomEmail("masterdealer@test.com", "test.com")

    // Dealer email
    await page.waitForSelector('input[name="email"]')
    await page.click('input[name="email"]')
    await page.type('input[name="email"]', randomDealerEmail)
    console.log(`Dealer Email Added Successfully: ${randomDealerEmail}`)

    // Fill Mobile No.
    await page.waitForSelector('input[name="mobile"]', { visible: true })
    await page.click('input[name="mobile"]')
    await page.type('input[name="mobile"]', "9999999999")
    console.log("Mobile No. Added Successfully!")

    // Select Distributor
    await page.waitForSelector('select[name="distributorId"]', {
      visible: true
    })
    await page.click('select[name="distributorId"]')
    //   waitForTimeout(100)

    let distributorIdOpt = await page.evaluate(() => {
      const distributorId = document.querySelector('select[name="distributorId"]')
      console.log("distributorId dom", distributorId)
      let options = () => {
        for (const option of distributorId.childNodes) {
          console.log("option dom", option)
          if (option.value) {
            option.selected = "selected"
            return option.getAttribute("value")
          }
        }
      }
      // console.log(options())
      return options()
    })
    await page.select('select[name="distributorId"]', distributorIdOpt)
    console.log("Distributor selected successfully!")
  }

  // Click on the RTO input field and type the search query
  await page.waitForSelector("#rtoId .css-19bb58m", { visible: true })
  await page.click("#rtoId .css-19bb58m")

  await page.type("#rtoId .css-19bb58m", "DL")
  console.log("successfully searched.....")

  await page.waitForSelector("#rtoId .css-ola5lb-menu", { visible: true })
  waitForTimeout(3000)

  // let rtoId = await page.evaluate(() => {
  //   const rtoList = document.querySelector(".css-ola5lb-menu")
  //   console.log("rtoList", rtoList)
  //   return rtoList
  // })
  await page.waitForSelector(".css-lakovd-option")
  await page.click(".css-lakovd-option")

  console.log("RTO found sucessfully !")

  await page.waitForSelector('input[name="pincode"]')
  await page.click('input[name="pincode"]')
  await page.type('input[name="pincode"]', "122001")
  console.log("Pincode Added Successfully!")

  // Sales Person
  await page.waitForSelector("#salesPerson .css-19bb58m", {
    visible: true
  })
  await page.click("#salesPerson .css-19bb58m")

  await page.type("#salesPerson .css-19bb58m", "Ga")
  console.log("successfully searched sales person.....")

  await page.waitForSelector("#salesPerson .css-ola5lb-menu", { visible: true })
  waitForTimeout(3000)

  await page.waitForSelector(".css-lakovd-option")
  await page.click(".css-lakovd-option")
  console.log("Sales Person found sucessfully !")

  // Dealership Services
  await page.waitForSelector('select[name="services"]', { visible: true })
  await page.click('select[name="services"]')

  let servicesOpt = await page.evaluate(() => {
    const variant = document.querySelector('select[name="services"]')
    let options = () => {
      for (const option of variant.childNodes) {
        console.log("option", option)
        if (option.value) {
          option.selected = "selected"
          return option.getAttribute("value")
        }
      }
    }
    return options()
  })
  await page.select('select[name="services"]', servicesOpt)
  console.log("Dealership Services selected !")

  //Add Address
  await page.waitForSelector('input[name="address1"]')
  await page.click('input[name="address1"]')
  await page.type('input[name="address1"]', "Sample Address")
  console.log("Address Added Successfully!")

  // Dealership Owner

  // Name
  await page.waitForSelector('input[name="ownerName"]')
  await page.click('input[name="ownerName"]')
  await page.type('input[name="ownerName"]', " Test Master Dealer Owner")
  console.log("Owner Name Added Successfully!")

  //Email
  //await page.waitForSelector('input[name="ownerEmail"]')
  //await page.click('input[name="ownerEmail"]')
  //await page.type(
  //'input[name="ownerEmail"]',
  //"masterdealerOwner747328432@test.com"
  //)
  //console.log("Owner Email Added Successfully!")

  const randomOwnerEmail = generateRandomEmail("masterdealerowner@test.com", "test.com")
  // Owner email
  await page.waitForSelector('input[name="ownerEmail"]')
  await page.click('input[name="ownerEmail"]')
  await page.type('input[name="ownerEmail"]', randomOwnerEmail)
  console.log(`Owner Email Added Successfully: ${randomOwnerEmail}`)

  // Mobile No.
  await page.waitForSelector('input[name="ownerMobile"]', { visible: true })
  await page.click('input[name="ownerMobile"]')
  await page.type('input[name="ownerMobile"]', "9999999999")
  console.log("Owner Mobile No. Added Successfully!")

  // Click Next button
  await page.waitForSelector('button[type="submit"]', { visible: true })
  await page.click('button[type="submit"]')
  console.log("Next BUtton Clicked successfully!")

  const ok = "/html/body/div[2]/div/div[3]/button[1]"
  const okelement = await page.waitForSelector(`xpath/${ok}`)
  await okelement.click()
  console.log("Clicked on Create Dealer")

  // GST no
  await page.waitForSelector('input[name="dsGSTNum"]', { visible: true })
  await page.click('input[name="dsGSTNum"]')
  await page.type('input[name="dsGSTNum"]', "55KLION4789RYZ5")
  console.log("GST No. Added Successfully!")

  // pan uploaded

  let fileToUploadPAN = "/Users/arpitapandey/OfficeProjects/pupet-test/src/fileholder/pan.png"

  const uploadPAN = await page.waitForSelector("#panDs")
  await uploadPAN.uploadFile(fileToUploadPAN)
  console.log("PAN uploaded successfully!")

  let fileToUploadCancelledCheck = "/Users/arpitapandey/OfficeProjects/pupet-test/src/fileholder/sampleJpg.jpeg"

  const cancelledCheck = await page.waitForSelector("#cancelledChequeDs")
  await cancelledCheck.uploadFile(fileToUploadCancelledCheck)
  console.log("Cancelled Check uploaded successfully!")

  let fileToUploadGSTDocs = "/Users/arpitapandey/OfficeProjects/pupet-test/src/fileholder/sampleJpg.jpeg"

  const GSTDocs = await page.waitForSelector("#gstDs")
  await GSTDocs.uploadFile(fileToUploadGSTDocs)
  console.log("Cancelled Check uploaded successfully!")

  let makeDivClass = ".css-b62m3t-container"

  await page.waitForSelector(makeDivClass)

  await page.click(makeDivClass)
  await page.waitForSelector(".css-10wo9uf-option")
  await page.click(".css-10wo9uf-option")
  await page.click(".css-10wo9uf-option")
  await page.click(".css-10wo9uf-option")

  await page.waitForSelector(".css-hlgwow")
  await page.click(".css-hlgwow")

  await page.waitForSelector(".css-19bb58m")
  await page.click(".css-19bb58m")

  // Add a delay to allow for any post-login processes
  await new Promise((resolve) => setTimeout(resolve, 5000))

  // await browser.close()
  //console.log("Browser closed")
})()
