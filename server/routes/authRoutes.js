const express = require('express');
const { registerUser, authUser } = require('../controllers/authController');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

router.post('/register', upload.single('userPic'), registerUser);
router.post('/login', authUser);

module.exports = router;
