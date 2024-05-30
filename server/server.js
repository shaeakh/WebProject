const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

// For serving static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
