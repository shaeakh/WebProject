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




  module.exports = AuctionModels;