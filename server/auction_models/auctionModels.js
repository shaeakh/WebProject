const db = require('../config/db');
const bcrypt = require('bcryptjs');

const AuctionModels = {};

AuctionModels.getTeamsByTournamentId = (tournamentId, callback) => {
    const query = `
      SELECT 
        t.team_name, 
        t.team_logo, 
        COUNT(p.reg_no) AS total_players,
        t.coin AS current_balance
      FROM 
        team t
      LEFT JOIN 
        player p ON t.team_id = p.team_id
      WHERE 
        t.tournament_id = ?
      GROUP BY 
        t.team_id
    `;
  
    db.query(query, [tournamentId], callback);
  };

  AuctionModels.getPlayersByTournamentId = (tournamentId, callback) => {
    const query = `
      SELECT 
        p.reg_no,
        u.name,
        p.position,
        p.category,
        u.user_pic_url AS img_link,
        p.player_price AS base_value,
        a.current_bid AS current_value,
        a.sold
      FROM 
        player p
      JOIN 
        users u ON p.reg_no = u.reg_no
      LEFT JOIN 
        auction_page a ON p.team_id = a.team_id AND p.tournament_id = a.tournament_id
      WHERE 
        p.tournament_id = ?
    `;
  
    db.query(query, [tournamentId], callback);
  };


  AuctionModels.getTeamsDetailsByTournamentId = (tournamentId, callback) => {
    const query = `
      SELECT 
        t.team_name,
        t.team_logo,
        u.name AS manager_name,
        t.coin AS current_balance,
        COUNT(p.reg_no) AS total_players
      FROM 
        team t
      JOIN 
        users u ON t.reg_no = u.reg_no
      LEFT JOIN 
        player p ON t.team_id = p.team_id
      JOIN 
        auction_page a ON t.team_id = a.team_id
      WHERE 
        t.tournament_id = ?
      GROUP BY 
        t.team_id
    `;
  
    db.query(query, [tournamentId], callback);
  };
  



  module.exports = AuctionModels;