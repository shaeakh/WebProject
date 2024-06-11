const express = require('express');
const { updateUser, createTournament, updateTournament, getUserDetails, getCurrentTournamentDetails } = require('../controllers/homeController');
const {protect} = require('../middlewares/authMiddleware');
const { upload, uploadToCloudinary } = require('../middlewares/cloudinaryMiddleware');
const { getAllPlayers, updatePlayersCategories } = require('../controllers/playerController');
const router = express.Router();

// router.get('/', protect, getHomePage);
router.post('/update-user', protect, upload.single('userPicUrl'),uploadToCloudinary, updateUser);
router.post('/create-tournament', protect, upload.single('logoPicUrl'), uploadToCloudinary, createTournament);
router.put('/update-tournament', protect, upload.single('logoPicUrl'), uploadToCloudinary, updateTournament);
router.get('/user-details', protect, getUserDetails);
router.get('/tournament-details', protect, getCurrentTournamentDetails);




module.exports = router;
