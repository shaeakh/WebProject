const express = require('express');
const {getTeamsByTournamentId, getPlayersByTournamentId, getTeamsDetailsByTournamentId,startAuction,update_pause,update_player_index,fetch_real_time_info,fetch_last_bidding_team} = require('../controllers/auctionControllers');
const {protect} = require('../middlewares/authMiddleware');
const { upload, uploadToCloudinary } = require('../middlewares/cloudinaryMiddleware');
const auctionRouter = express.Router();

// Admin auction page routes
auctionRouter.post('/teams', protect, getTeamsByTournamentId);
auctionRouter.post('/players', protect, getPlayersByTournamentId);
auctionRouter.post('/team_details', protect, getTeamsDetailsByTournamentId);
auctionRouter.post('/start', protect, startAuction);
auctionRouter.post('/update_pause', protect, update_pause);
auctionRouter.post('/update_player_index', protect, update_player_index);
auctionRouter.post('/realtime_info', protect, fetch_real_time_info);
auctionRouter.post('/last_bidding_team', protect, fetch_last_bidding_team);


module.exports = auctionRouter;

