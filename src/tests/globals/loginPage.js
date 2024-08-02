import { dealershipExecutive } from "../../loginCreds/index.js"
import { waitForTimeout } from "../../utils/functions.js"

export async function loginPage(page) {
  let { email, password, usePassword } = dealershipExecutive
  await page.waitForSelector("input#login-email")
  await page.click("input#login-email")
  await page.type("input#login-email", email || "kisame@test.com")

  // console.log("userPassword", usePassword)
  if (usePassword) {
    await page.waitForSelector("input#login-password")
    await page.click("input#login-password")
    await page.type("input#login-password", password)
  }

  //! in case if password is not auto-filled
  // await page.keyboard.down("Control") // or 'Command' on macOS
  // await page.keyboard.press('A')
  // await page.keyboard.up("Control") // or 'Command' on macOS
  // await page.keyboard.press("Backspace")
  // await page.type("input#login-email", "TempPassw0rd!")

  await page.waitForSelector("form") // Optionally wait for the form to be present
  await page.waitForSelector('form button[type="submit"]') // Replace with the actual selector for the submit button

  //pincodeState
  // Click the submit button
  await page.click('form button[type="submit"]')
  await waitForTimeout(2000)
}
