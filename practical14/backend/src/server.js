require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5174' }));
app.use(express.json());

// Multer config: PDF only, max 2MB
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_');
    cb(null, `${timestamp}_${safeName}`);
  }
});

function fileFilter(req, file, cb) {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    const error = new multer.MulterError('LIMIT_UNEXPECTED_FILE');
    error.message = 'Only PDF files are allowed.';
    cb(error);
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/upload', upload.single('resume'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ ok: false, message: 'No file uploaded.' });
  }
  res.json({ ok: true, message: 'File uploaded successfully.', file: { filename: req.file.filename, size: req.file.size } });
});

// Error handler for multer and general errors
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ ok: false, message: 'File too large. Max 2MB.' });
    }
    return res.status(400).json({ ok: false, message: err.message || 'Upload error.' });
  }
  return res.status(500).json({ ok: false, message: 'Server error.' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
