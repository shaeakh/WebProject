const express = require('express');
const { getHomePage, updateUser, createTournament, joinTournament } = require('../controllers/homeController');
const {protect} = require('../middlewares/authMiddleware');
const { upload, uploadToCloudinary } = require('../middlewares/cloudinaryMiddleware');
const router = express.Router();

router.get('/', protect, getHomePage);
router.post('/update', protect, upload.single('userPicUrl'),uploadToCloudinary, updateUser);
router.post('/create-tournament', protect, upload.single('logoPicUrl'), uploadToCloudinary, createTournament);
router.post('/join-tournament', protect, upload.single('teamLogo'),uploadToCloudinary, joinTournament);

module.exports = router;
