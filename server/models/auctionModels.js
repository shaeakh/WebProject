const db = require('../config/db');
const bcrypt = require('bcryptjs');

const AuctionModels = {};

AuctionModels.getTeamsByTournamentId = (tournamentId, callback) => {
  const query = `
      SELECT 
        t.team_name,
        u.name as manager_name,
        t.team_logo, 
        COUNT(p.reg_no) AS total_players,
        t.coin AS current_balance
      FROM 
        team t
      LEFT JOIN 
        player p ON t.team_id = p.team_id
      JOIN 
      	users as u on u.reg_no = t.reg_no
      WHERE 
        t.tournament_id = 7
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

AuctionModels.team_details_manager = (tournamentId, reg_no, callback) => {
  console.log(tournamentId, reg_no);

  const query =
    `
    SELECT 
      t.team_id,
      t.team_name,
      t.team_logo,
      t.coin AS current_balance,
      tt.num_of_player as base_player_num,
      tt.player_base_coin as base_player_value,
      COUNT(p.reg_no) AS players_bought
    FROM 
        team AS t
    JOIN
        player AS p ON p.team_id = t.team_id
    JOIN
      tournament as tt on tt.tournament_id = t.tournament_id
    WHERE 
        t.tournament_id = ? AND t.reg_no = ?
    GROUP BY
        t.team_id;
    `
  db.query(query, [tournamentId, reg_no], callback);
}


AuctionModels.start_Auction = (tournamentId, callback) => {
  const query = `
    UPDATE auction_page 
    SET start = true        
    WHERE tournament_id = ? 
    `;
  db.query(query, [tournamentId], callback);
}

AuctionModels.update_pause = (tournamentId, pause, callback) => {
  const query = `
    UPDATE auction_page 
    SET pause = ?        
    WHERE tournament_id = ? 
    `;
  db.query(query, [pause, tournamentId], callback);
}

AuctionModels.update_player_index = (tournamentId, current_player_index, callback) => {

  const query = `
      UPDATE auction_page
      SET current_player_index = ?
      WHERE tournament_id = ?;
    `;
  db.query(query, [current_player_index, tournamentId], callback);
}

AuctionModels.fetch_last_bidding_team = (tournamentId, callback) => {
  const query = `
    SELECT 
      t.team_logo AS team_logo, 
      t.team_name AS team_name, 
      u.name AS manager, 
      t.coin AS balance, 
      COUNT(p.reg_no) AS total_players
      
    FROM 
      auction_page AS au 
    JOIN 
      team AS t ON au.team_id = t.team_id 
    JOIN 
      users AS u ON t.reg_no = u.reg_no 
    LEFT 
      JOIN player AS p ON p.team_id = au.team_id 
    WHERE au.tournament_id = ?
    GROUP BY t.team_logo, t.team_name, u.name, t.coin;
  `

  db.query(query, [tournamentId], callback);
}

AuctionModels.fetch_real_time_info = (tournamentId, callback) => {
  const query =
    `
    SELECT 
      au.current_player_index,
      au.current_bid,
      au.sold,
      au.start,
      au.pause
    FROM 
      auction_page AS au
    WHERE au.tournament_id = ?;
  `
  db.query(query, [tournamentId], callback);
}



module.exports = AuctionModels;
