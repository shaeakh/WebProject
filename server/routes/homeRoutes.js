const express = require('express');
const { updateUser, createTournament, updateTournament, getUserDetails, getCurrentTournamentDetails, getUserParticipatedTournaments, joinTournament, getMemberRequests, acceptMemberRequest, rejectMemberRequest, getPlayersByTournament, updatePlayerCategories } = require('../controllers/homeController');
const {protect} = require('../middlewares/authMiddleware');
const { upload, uploadToCloudinary } = require('../middlewares/cloudinaryMiddleware');
const router = express.Router();

router.post('/update-user', protect, upload.single('userPicUrl'),uploadToCloudinary, updateUser);
router.post('/create-tournament', protect, upload.single('logoPicUrl'), uploadToCloudinary, createTournament);
router.put('/update-tournament', protect, upload.single('logoPicUrl'), uploadToCloudinary, updateTournament);
router.get('/user-details', protect, getUserDetails);
router.get('/tournament-details', protect, getCurrentTournamentDetails);
router.get('/participated-tournaments', protect, getUserParticipatedTournaments);
router.post('/join-tournament', protect, upload.single('teamLogo'), uploadToCloudinary, joinTournament);
router.get('/member-requests', protect, getMemberRequests);
router.post('/member-requests/:requestId/accept', protect, acceptMemberRequest);
router.delete('/member-requests/:requestId/reject', protect, rejectMemberRequest);
router.get('/players/:tournamentId', protect, getPlayersByTournament);
router.post('/players/categories', protect, updatePlayerCategories); /*{
{
  "players": [
    { "tournament_id": 1, "reg_no": "2020831", "category": "Platinum" },
    { "tournament_id": 1, "reg_no": "2020832", "category": "Gold" }
  ]
}
}*/


module.exports = router;
