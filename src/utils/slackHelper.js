import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager"
import axios from "axios"
import dotenv from "dotenv"
dotenv.config({ path: "../../.env" })

const fetchSecret = async (secretName) => {
  try {
    const command = new GetSecretValueCommand({ SecretId: secretName })
    const smClient = new SecretsManagerClient({ region: "ap-south-1" })
    const response = await smClient.send(command)
    return JSON.parse(response.SecretString)
  } catch (error) {
    return undefined
  }
}

const slackDetails = {
  CHANNEL_ID: process.env.SLACK_CHANNEL_ID,
  URL: "https://slack.com/api/"
}
export const sendSlackMessage = async (message) => {
  const body = {
    channel: slackDetails.CHANNEL_ID,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: message?.testSuiteName,
          emoji: true
        }
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `\`\`\`${JSON.stringify(message, null, 2)}\n\`\`\``
        }
      }
    ]
  }
  let res
  const url = `${slackDetails.URL}chat.postMessage`
  // console.info({ url })
  const { token } = await fetchSecret("slack-bearertoken")
  const headers = {
    Authorization: token,
    "Content-Type": "application/json"
  }
  try {
    res = await axios.post(url, body, { headers })
    console.log("slack success")
  } catch (err) {
    res = err.message
    console.error(res)
    console.log("slack error", res)
  }
  return res
}
