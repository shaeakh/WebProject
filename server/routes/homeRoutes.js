const express = require('express');
const { getHomePage, updateUser, createTournament, joinTournament } = require('../controllers/homeController');
const protect = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

router.get('/', protect, getHomePage);
router.post('/update', protect, upload.single('userPic'), updateUser);
router.post('/create-tournament', protect, upload.single('logoPic'), createTournament);
router.post('/join-tournament', protect, upload.single('teamLogo'), joinTournament);

module.exports = router;
