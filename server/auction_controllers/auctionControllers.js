const bcrypt = require('bcryptjs');
const fs = require('fs');
const AuctionModels = require('../auction_models/auctionModels');

exports.getTeamsByTournamentId = (req, res) => {
    const { tournamentId } = req.params;
  
    AuctionModels.getTeamsByTournamentId(tournamentId, (err, teams) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching teams', error: err });
      }
      res.status(200).json(teams);
    });
  };