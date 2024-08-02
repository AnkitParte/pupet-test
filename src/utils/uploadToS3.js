import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

export const uploadToS3 = async (htmlData, dirName, title) => {
  try {
    const awsClient = new S3Client({ region: "ap-south-1" })
    const date = new Date().toISOString().slice(0, 10)
    const params = {
      Bucket: "acpl-core",
      Key: `frontend-reports/${dirName}/${title}-${date}.html`,
      Body: htmlData,
      ContentType: "text/html"
    }
    const reportLink = `https://acpl-core.s3.ap-south-1.amazonaws.com/frontend-reports/${dirName}/${title}-${date}.html`
    const response = await awsClient.send(new PutObjectCommand(params))
    console.log("Success in S3 upload")
    return reportLink
  } catch (e) {
    console.log("Error in S3 upload", e)
    return "blank_url"
  }
}
