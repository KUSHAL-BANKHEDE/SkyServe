const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const api = require('./routes');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(bodyParser.json());
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));


  app.post('/upload', upload.single('file'), async (req, res) => {
    try {
      const { userId } = req.body;
      const file = new File({
        userId,
        filename: req.file.filename,
        originalname: req.file.originalname,
        filetype: req.file.mimetype,
      });
      await file.save();
      res.status(200).json({ message: 'File uploaded', file });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.use('/api' , api );



const PORT = process.env.PORT || 8888;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
