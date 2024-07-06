const express = require('express');
const {getTeamsByTournamentId, getPlayersByTournamentId} = require('../auction_controllers/auctionControllers');
const {protect} = require('../middlewares/authMiddleware');
const { upload, uploadToCloudinary } = require('../middlewares/cloudinaryMiddleware');
const auctionRouter = express.Router();

// Admin auction page routes
auctionRouter.get('/tournament/:tournamentId/teams', protect, getTeamsByTournamentId);
auctionRouter.get('/tournament/:tournamentId/players', protect, getPlayersByTournamentId);


module.exports = auctionRouter;

