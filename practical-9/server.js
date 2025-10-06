// server.js
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Path to the log file (error.txt)
const logFilePath = path.join(__dirname, "error.txt");

// Route to display the log file
app.get("/logs", (req, res) => {
  fs.readFile(logFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading log file:", err.message);
      return res.status(500).send(`
        <h1>Error Loading Logs</h1>
        <p>${
          err.code === "ENOENT"
            ? "error.txt file not found."
            : "Unable to read error.txt file."
        }</p>
      `);
    }

    res.send(`
      <html>
        <head>
          <title>Error Logs</title>
            <style>
              body { background: #f9f9f9; color: #222; font-family: monospace; padding: 20px; }
              h1 { color: #333; }
              pre { 
                white-space: pre-wrap; 
                word-wrap: break-word; 
                background: #fff; 
                border: 1px solid #ccc; 
                padding: 15px; 
                border-radius: 5px; 
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
              }
            </style>
        </head>
        <body>
          <h1>Error Logs</h1>
          <pre>${data}</pre>
        </body>
      </html>
  `);
  });
});

app.listen(PORT, () => {
  console.log(`Log viewer running on http://localhost:${PORT}/logs`);
});
