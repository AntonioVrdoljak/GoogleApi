const express = require("express")
const { google } = require("googleapis")
require("dotenv").config()

const app = express()

// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error("Error:", err.message)
  res.status(500).send("Internal Server Error")
})

app.get("/", async (req, res) => {
  try {
    // Authentication
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    })

    // Create client instance for auth
    const client = await auth.getClient()

    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client })

    const spreadsheetId = "1m3vhA2A2ACOfcKJnfjGPybyIlQwYPxIyMf0F0gJjgHQ"

    // Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Personal Call Handling",
    })

    const rows = getRows.data.values || []

    // Generate HTML table
    const htmlTable = `
      <html>
        <head>
          <title>Google Sheets Data</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th, td {
              border: 1px solid #ccc;
              padding: 10px;
              text-align: left;
            }
          </style>
        </head>
        <body>
          <table>
            <thead>
              <tr>
                <th onclick="sortTable(0)">Column 1</th>
                <th onclick="sortTable(1)">Column 2</th>
                <th onclick="sortTable(2)">Column 3</th>
                <th onclick="sortTable(3)">Column 4</th>
                <!-- Add more columns as needed -->
              </tr>
            </thead>
            <tbody>
              ${rows
                .map(
                  (row) =>
                    `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`
                )
                .join("")}
            </tbody>
          </table>

          <script>
            function sortTable(colIndex) {
              const table = document.querySelector('table');
              const rows = Array.from(table.rows).slice(1); // Exclude header row
              rows.sort((a, b) => {
                const aValue = a.cells[colIndex].textContent;
                const bValue = b.cells[colIndex].textContent;
                return aValue.localeCompare(bValue, undefined, {
                  numeric: true,
                  sensitivity: 'base',
                });
              });
              table.tBodies[0].append(...rows);
            }
          </script>
        </body>
      </html>
    `

    res.send(htmlTable)
  } catch (error) {
    next(error)
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
