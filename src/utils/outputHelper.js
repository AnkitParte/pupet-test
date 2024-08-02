export const htmlOutput = (title, data) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Policy/Certificate Test Output</title>
      <style>
        @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
        table {
          border-collapse: collapse;
          width: 100%;
          overflow-x' scroll;
        }
        .roboto-regular {
          font-family: "Roboto", sans-serif;
          font-weight: 400;
          font-style: normal;
        }
        th,
        td {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }
  
        th {
          background-color: #f2f2f2;
        }
      </style>
    </head>
    <body>
      <div class="roboto-regular">
      <h2 style="text-align:center;">${title}</h2>
        <table>
          <tr>
            <th>S.No.</th>
            <th>Description</th>
            <th>Status</th>
            <th>Message</th>
          </tr>
          <tbody>
          ${data.map((item, idx) => {
            let statusStyle = item.status.includes("Succeed")
              ? 'style="background-color: #80ed99; color: black;"'
              : 'style="background-color: #f28482; color: black;"'
            return `
              <tr>
                <td>${idx + 1}</td>
                <td>${item.title}</td>
                <td ${statusStyle}>${item.status}</td>
                <td>${item.message}</td>
              </tr>
            `
          })}
          </tbody>
        </table>
      </div>
    </body>
  </html>`
}
