// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Route: Show logs
app.get('/logs', (req, res) => {
  const logFilePath = path.join(__dirname, 'logs', 'error.log');

  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading log file:", err.message);
      return res.status(500).send(`
        <h1>⚠️ Error</h1>
        <p>Unable to read log file. Please check if <code>error.log</code> exists.</p>
      `);
    }

    res.send(`
      <html>
        <head>
          <title>Error Logs</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; background: #f8f9fa; }
            h1 { color: #d32f2f; }
            pre { background: #000; color: #0f0; padding: 15px; border-radius: 6px; overflow-x: auto; }
          </style>
        </head>
        <body>
          <h1>📄 Error Logs</h1>
          <pre>${data}</pre>
        </body>
      </html>
    `);
  });
});

// Default route
app.get('/', (req, res) => {
  res.send('<h2>Welcome! Visit <a href="/logs">/logs</a> to view error logs.</h2>');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
