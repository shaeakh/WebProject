// routes/authRoutes.js
const express = require('express');
const { registerUser, authUser, logoutUser } = require('../controllers/authController');
const { upload, uploadToCloudinary } = require('../middlewares/cloudinaryMiddleware');
const router = express.Router();

router.post('/register', upload.single('userPicUrl'), uploadToCloudinary, registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);

module.exports = router;
