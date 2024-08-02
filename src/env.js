import dotenv from "dotenv"
dotenv.config({ path: "../.env" })

export let doSlack = process.env.DO_SLACK
export let channelId = process.env.SLACK_CHANNEL_ID
