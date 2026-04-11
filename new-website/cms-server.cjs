const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

const DATA_FILE = path.join(__dirname, 'src', 'data.json');

// --------------------------------------------------------------------------
// STORAGE SETUP FOR IMAGES
// --------------------------------------------------------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'upload-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

// --------------------------------------------------------------------------
// API ENDPOINTS
// --------------------------------------------------------------------------

// API: VERIFY PIN
app.post('/api/verify-pin', (req, res) => {
  const { pin } = req.body;
  
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const storedPin = data.AdminSettings.find(s => s.key === 'secret_pin').value;

    if (pin === storedPin) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Invalid Secret PIN' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

// API: SAVE DATA
app.post('/api/save', (req, res) => {
  const newData = req.body;
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(newData, null, 2), 'utf8');
    console.log('✅ CMS: Database Updated!');
    res.json({ success: true, message: 'Data saved successfully' });
  } catch (error) {
    console.error('❌ CMS Save Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// API: UPLOAD IMAGE
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
  console.log('✅ CMS: Image Uploaded!', req.file.filename);
  res.json({ success: true, filename: req.file.filename, url: '/' + req.file.filename });
});

app.listen(PORT, () => {
  console.log(`🚀 CMS Helper Server running at http://localhost:${PORT}`);
});
