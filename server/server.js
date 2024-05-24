const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const upload = require('./middlewares/uploadMiddleware');

const app = express();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

// For handling file uploads (ID card and user pic)
app.post('/api/upload', upload.fields([{ name: 'idCardPic', maxCount: 1 }, { name: 'userPic', maxCount: 1 }]), (req, res) => {
  res.json({ message: 'Files uploaded successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
