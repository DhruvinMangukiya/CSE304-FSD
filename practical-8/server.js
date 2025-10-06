const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = 5000;

// Serve React build or public folder
const staticDir = fs.existsSync(path.join(__dirname, 'build')) ? 'build' : 'public';
app.use(express.static(path.join(__dirname, staticDir)));
app.use(express.json());


// Ensure data.json exists
const dataPath = path.join(__dirname, 'data.json');
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, JSON.stringify({ count: 0 }), 'utf8');
}


app.get('/counter', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  res.json({ count: data.count });
});

app.post('/counter', (req, res) => {

  const { count } = req.body;
  fs.writeFileSync(dataPath, JSON.stringify({ count }), 'utf8');
  res.json({ count });
});

// Fallback for SPA routing (React)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, staticDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
