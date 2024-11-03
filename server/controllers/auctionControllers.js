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

  exports.team_details_manager = (req,res)=>{
    const {tournamentId} = req.body;
    const reg_no = req.user.reg_no;
    AuctionModels.team_details_manager(tournamentId,reg_no,(err,result)=>{
      if(err){
        
        return res.status(500).json({ message: 'Error fetching team management info', error: err });
      }
      res.status(200).json(result[0]);
    })
  }

  exports.getTeamsDetailsByTournamentId = (req, res) => {
      const {tournamentId, reg_no } = req.body;
      
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

  exports.fetch_last_bidding_team =(req,res) =>{
    const {tournamentId} = req.body;
    AuctionModels.fetch_last_bidding_team(tournamentId,(err,result)=>{
      if (err) {
        return res.status(500).json({ message: 'Error fetching last bidding team', error: err });
      }
      if(result.length === 0){
        const initialobj = {
          team_logo: 'https://static.vecteezy.com/system/resources/previews/000/552/791/non_2x/flag-waving-vector-icon.jpg',
          team_name: 'No team has bid yet',
          manager: 'none',
          total_players: 0,
          balance: 0
        };
        return res.status(200).json(initialobj);
      }
      res.status(200).json(result[0]);
    })
  }

  exports.fetch_real_time_info = (req,res) =>{
    const {tournamentId} = req.body;

    AuctionModels.fetch_real_time_info(tournamentId,(err,result)=>{
      if (err) {
        return res.status(500).json({ message: 'Error loading realtime info', error: err });
      }
      if(result.length === 0){
        const initialobj = {
          team_logo : '',
          team_name : '',
          manager : '',
          total_players : 0,
          
          balance : 0,
          current_bid : 0,
          current_player_index : 0,
           // this have to be fetched from the player table
          sold : 0, // this have to be fetched from the player table
          start : false,
          pause : false,

        }
        return res.status(200).json(initialobj);
      }
      res.status(200).json(result[0]);
    })
  }


