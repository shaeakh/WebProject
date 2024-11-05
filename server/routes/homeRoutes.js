const express = require('express');
const { updateUser, createTournament,startAuction, updateTournament, getUserDetails, getCurrentTournamentDetails, getUserParticipatedTournaments, joinTournament, getMemberRequests, acceptMemberRequest, rejectMemberRequest, getPlayersByTournament, updatePlayerCategories, getTeamDetailsByManager,getTeamDetailsByPlayer,getTeamPlayersByPlayer, getTournamentDetailsWithTeams, getTeamsInTournament,findTournamentRoleByUser,getTournamentInfo,getPlayersInTeam  } = require('../controllers/homeController');
const {protect} = require('../middlewares/authMiddleware');
const { upload, uploadToCloudinary } = require('../middlewares/cloudinaryMiddleware');
const router = express.Router();

// home page routes
router.post('/update-user', protect, upload.single('userPicUrl'),uploadToCloudinary, updateUser);
router.get('/participated-tournaments', protect, getUserParticipatedTournaments);
router.get('/user-details', protect, getUserDetails);

// create tournament routes
router.post('/create-tournament', protect, upload.single('logoPicUrl'), uploadToCloudinary, createTournament);

//start-auction
router.post('/start-auction', protect, startAuction);

// update tournament routes
router.put('/update-tournament/:tournamentId', protect, upload.single('logoPicUrl'), uploadToCloudinary, updateTournament);

router.get('/tournament-details/:tournamentId', protect, getCurrentTournamentDetails);

// join tournament routes
router.post('/join-tournament', protect, upload.single('teamLogo'), uploadToCloudinary, joinTournament);

//tournament page routes
router.post('/tournament-role', protect, findTournamentRoleByUser);


// member requests routes
router.get('/member-requests/:tournamentId', protect, getMemberRequests);
router.post('/member-requests/:tournamentId/:requestId/accept', protect, acceptMemberRequest);
router.delete('/member-requests/:requestId/reject', protect, rejectMemberRequest);

// set player categories routes
router.get('/players/:tournamentId', protect, getPlayersByTournament);
router.post('/players/categories', protect, updatePlayerCategories); 

// manager view page
router.post('/team-details-managerview', protect, getTeamDetailsByManager);
router.post('/team-details-playerview', protect, getTeamDetailsByPlayer);
router.post('/team-players-playerview', protect, getTeamPlayersByPlayer);
router.post('/team-players-managerview', protect,getPlayersInTeam);

// tournament details page
router.post('/tournament-info', protect, getTournamentInfo);

// admin auction page
router.post('/tournament-teams', protect, getTeamsInTournament);

// manager auction page


// general auction page

module.exports = router;
