const bcrypt = require('bcryptjs');
const fs = require('fs');
const AuctionModels = require('../models/auctionModels');

exports.getTeamsByTournamentId = (req, res) => {
    const { tournamentId } = req.body;
    AuctionModels.getTeamsByTournamentId(tournamentId, (err, teams) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching teams', error: err });
      }
      res.status(200).json(teams);
    });
  };


  exports.getPlayersByTournamentId = (req, res) => {
    const { tournamentId } = req.body;
    AuctionModels.getPlayersByTournamentId(tournamentId, (err, players) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching players', error: err });
      }
      res.status(200).json(players);
    });
  };

  exports.getTeamsDetailsByTournamentId = (req, res) => {
      const {tournamentId } = req.body;
    
      AuctionModels.getTeamsDetailsByTournamentId(tournamentId, (err, teams) => {
        if (err) {
          return res.status(500).json({ message: 'Error fetching teams', error: err });
        }
        res.status(200).json(teams[0]);
      });
    };

  exports.startAuction = (req, res) => {
    const {tournamentId } = req.body;
  
    AuctionModels.start_Auction(tournamentId, (err, auction) => {
      if (err) {
        return res.status(500).json({ message: 'Error starting auction', error: err });
      }
      res.status(200).json({ message: 'Auction Started Succesfully' });
    });
  }

  exports.update_pause = (req, res) =>{
    const {tournamentId,pause } = req.body;
    console.log(tournamentId,pause);
    AuctionModels.update_pause(tournamentId,pause, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error pausing auction', error: err });
      }
      res.status(200).json({ message: `Pause status : ${pause}` });
    });
  }

  exports.update_player_index = (req, res) => {
    const {tournamentId,current_player_index } = req.body;
    AuctionModels.update_player_index(tournamentId,current_player_index, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error shifting player index', error: err });
      }
      res.status(200).json({ message: 'Player index shifting successful' });
    });
  }


