import axios from "axios"
import { BAJAJ, ICICI, SHRI_RAM, TATA, UNITED } from "../../utils/constants.js"
import { bajajIB, iciciIB, shriRamIB, tataIB, unitedIB } from "./apiPayload.js"
import dotenv from "dotenv"
dotenv.config({ path: "../../../.env" })

console.log("LOGIN_URL", process.env.LOGIN_URL)
let loginUrl = process.env.LOGIN_URL || "https://35pbqpolz2.execute-api.ap-south-1.amazonaws.com/dev/user/cognito/login"
// console.log("LOGIN_URL", loginUrl)
console.log("CONFIG_URL", process.env.CONFIG_URL)
let configApiUrl = process.env.CONFIG_URL || "https://35pbqpolz2.execute-api.ap-south-1.amazonaws.com/dev/dynamic-config/dealership/insurer-denied"
// console.log("CONFIG_URL", configApiUrl)

export const changeConfigInsurer = async ({ accessToken, insurer }) => {
  let data
  if (insurer == SHRI_RAM) {
    data = shriRamIB
  } else if (insurer == TATA) {
    data = tataIB
  } else if (insurer == ICICI) {
    data = iciciIB
  } else if (insurer == BAJAJ) {
    data = bajajIB
  } else {
    data = unitedIB
  }

  let config = {
    method: "patch",
    url: configApiUrl,
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
      origin: "https://dev.admin.aegiscovenant.com/",
      priority: "u=1, i",
      referer: "https://dev.admin.aegiscovenant.com/",
      "sec-ch-ua": '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": '"Android"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "user-agent":
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36"
    },
    data: JSON.stringify(data)
  }

  try {
    let res = await axios.request(config)
    console.log("change insurer res -> ", insurer)
    // console.log("change insurer res->", res)
    return {
      status: 200
    }
  } catch (e) {
    console.log(e)
    return {
      status: 400
    }
  }
}

export const loginAdminApiCall = async () => {
  let data = {
    email: "tech@aegiscovenant.com",
    password: "TempPassw0rd!"
  }

  let config = {
    method: "post",
    url: loginUrl,
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      origin: "https://dev.admin.aegiscovenant.com/",
      priority: "u=1, i",
      referer: "https://dev.admin.aegiscovenant.com/",
      "sec-ch-ua": '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": '"Android"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "user-agent":
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36"
    },
    data: JSON.stringify(data)
  }

  try {
    let res = await axios.request(config)
    let { accessToken } = res?.data?.data
    // console.log("login api res->")
    // console.log("login api res->", res)
    return {
      status: 200,
      accessToken: accessToken
    }
  } catch (e) {
    console.log(e)
    return {
      status: 400
    }
  }
}
