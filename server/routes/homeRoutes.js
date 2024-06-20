const express = require('express');
const { updateUser, createTournament, updateTournament, getUserDetails, getCurrentTournamentDetails, getUserParticipatedTournaments, joinTournament, getMemberRequests, acceptMemberRequest, rejectMemberRequest, getPlayersByTournament, updatePlayerCategories, getTeamDetailsByManager, getTournamentDetailsWithTeams, getTeamsInTournament,findTournamentRoleByUser,getTournamentInfo  } = require('../controllers/homeController');
const {protect} = require('../middlewares/authMiddleware');
const { upload, uploadToCloudinary } = require('../middlewares/cloudinaryMiddleware');
const router = express.Router();

// home page routes
router.post('/update-user', protect, upload.single('userPicUrl'),uploadToCloudinary, updateUser);
router.get('/participated-tournaments', protect, getUserParticipatedTournaments);
router.get('/user-details', protect, getUserDetails);

// create tournament routes
router.post('/create-tournament', protect, upload.single('logoPicUrl'), uploadToCloudinary, createTournament);

// update tournament routes
router.put('/update-tournament', protect, upload.single('logoPicUrl'), uploadToCloudinary, updateTournament);

router.get('/tournament-details', protect, getCurrentTournamentDetails);

// join tournament routes
router.post('/join-tournament', protect, upload.single('teamLogo'), uploadToCloudinary, joinTournament);

//tournament page routes
router.post('/tournament-role', protect, findTournamentRoleByUser);


// member requests routes
router.get('/member-requests', protect, getMemberRequests);
router.post('/member-requests/:requestId/accept', protect, acceptMemberRequest);
router.delete('/member-requests/:requestId/reject', protect, rejectMemberRequest);

// set player categories routes
router.get('/players/:tournamentId', protect, getPlayersByTournament);
router.post('/players/categories', protect, updatePlayerCategories); /*{
{
  "players": [
    { "tournament_id": 1, "reg_no": "2020831", "category": "Platinum" },
    { "tournament_id": 1, "reg_no": "2020832", "category": "Gold" }
  ]
}
}*/

// manager view page
router.get('/team-details', protect, getTeamDetailsByManager);

// tournament details page
router.post('/tournament-info', protect, getTournamentInfo);
// router.get('/tournament-details', protect, getTournamentDetailsWithTeams);

// admin auction page
router.get('/tournament/:tournamentId/teams', protect, getTeamsInTournament);


// manager auction page


// general auction page

module.exports = router;
