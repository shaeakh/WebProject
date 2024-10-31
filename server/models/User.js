const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {};

User.create = (user, callback) => {
  const { name, email, phone, regNo, department, userPicUrl, password } = user;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = 'INSERT INTO users (reg_no, name, edu_mail, phone, department, user_pic_url, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [regNo, name, email, phone, department, userPicUrl, hashedPassword], callback);
};

User.findByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE edu_mail = ?';
  db.query(query, [email], callback);
};

User.findByRegNo = (id, callback) => {
  const query = 'SELECT * FROM users WHERE reg_no = ?';
  db.query(query, [id], callback);
};

User.update = (regNo, updatedUser, callback) => {
  const fields = [];
  const values = [];

  if (updatedUser.name) {
    fields.push('name = ?');
    values.push(updatedUser.name);
  }

  if (updatedUser.phone) {
    fields.push('phone = ?');
    values.push(updatedUser.phone);
  }

  if (updatedUser.userPicUrl) {
    fields.push('user_pic_url = ?');
    values.push(updatedUser.userPicUrl);
  }

  if (updatedUser.password) {
    fields.push('password = ?');
    values.push(updatedUser.password);
  }

  if (fields.length === 0) {
    return callback(null, { message: 'No fields to update' });
  }

  const query = `UPDATE users SET ${fields.join(', ')} WHERE reg_no = ?`;
  values.push(regNo);

  db.query(query, values, callback);
};



User.findTournamentsByUser = (regNo, callback) => {
  const query = `
    SELECT tournament.* FROM tournament
    INNER JOIN player ON tournament.tournament_id = player.tournament_id
    WHERE player.reg_no = ?`;
  db.query(query, [regNo], callback);
};


User.createTournament = (tournament, callback) => {
  const { tournamentName, sportType, tournamentDate, logoPicUrl, joinCode, regNo, playerBaseCoin, perTeamCoin,num_of_player } = tournament;

  // Start a transaction
  db.beginTransaction((err) => {
    if (err) {
      return callback(err);
    }

    const query = 'INSERT INTO tournament (tournament_name, sport_type, tournament_date, tournament_logo_url, join_code, reg_no, player_base_coin, per_team_coin,num_of_player) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    console.log(num_of_player);
    db.query(query, [tournamentName, sportType, tournamentDate, logoPicUrl, joinCode, regNo, playerBaseCoin, perTeamCoin,num_of_player], (err, result) => {
      if (err) {
        return db.rollback(() => {
          callback(err);
        });
      }

      const tournamentId = result.insertId;

      const auctionQuery = `INSERT INTO auction_page (tournament_id, team_id, current_player_index, current_bid, sold, start, pause) VALUES (?, null, 0, ${playerBaseCoin}, false, false, null)`;
      
      db.query(auctionQuery, [tournamentId], (err) => {
        if (err) {
          return db.rollback(() => {
            callback(err);
          });
        }

        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              callback(err);
            });
          }

          callback(null, result);
        });
      });
    });
  });
};




User.updateTournament = (tournamentId, updatedTournament, regNo, callback) => {
  const fields = [];
  const values = [];

  if (updatedTournament.tournamentName) {
    fields.push('tournament_name = ?');
    values.push(updatedTournament.tournamentName);
  }

  if (updatedTournament.sportType) {
    fields.push('sport_type = ?');
    values.push(updatedTournament.sportType);
  }

  if (updatedTournament.tournamentDate) {
    fields.push('tournament_date = ?');
    values.push(updatedTournament.tournamentDate);
  }

  if (updatedTournament.playerBaseCoin) {
    fields.push('player_base_coin = ?');
    values.push(updatedTournament.playerBaseCoin);
  }

  if (updatedTournament.perTeamCoin) {
    fields.push('per_team_coin = ?');
    values.push(updatedTournament.perTeamCoin);
  }

  if (updatedTournament.logoPicUrl) {
    fields.push('tournament_logo_url = ?');
    values.push(updatedTournament.logoPicUrl);
  }

  if (updatedTournament.num_of_player) {
    fields.push('num_of_player = ?');
    values.push(updatedTournament.num_of_player);
  }

  if (fields.length === 0) {
    return callback(null, { message: 'No fields to update' });
  }

  const query = `UPDATE tournament SET ${fields.join(', ')} WHERE tournament_id = ? AND reg_no = ?`;
  values.push(tournamentId, regNo);

  db.query(query, values, callback);
};


User.findCurrentTournamentByUser = (tournamentId, callback) => {
  const query = `
    SELECT * FROM tournament WHERE tournament_id = ?`;
  db.query(query, [tournamentId], callback);
};


User.findParticipatedTournamentsByUser = (regNo, callback) => {
  const query =
    `SELECT t.tournament_id, t.tournament_name, pt.role, t.tournament_logo_url FROM participated_tournament AS pt JOIN users AS u ON pt.reg_no = u.reg_no JOIN tournament AS t ON pt.tournament_id = t.tournament_id WHERE pt.reg_no = ?`;
  db.query(query, [regNo], callback);
};

User.findTournamentRoleByUser = (tournament_id, regNo, callback) => {
  const query =
    `SELECT role FROM participated_tournament WHERE tournament_id = ? AND reg_no = ?`;
  db.query(query, [tournament_id, regNo], callback);
};

User.getTournamentInfo = (tournament_id, callback) => {
  const query =
    `SELECT tournament_name,join_code,tournament_logo_url FROM tournament WHERE tournament_id = ?`;
  db.query(query, [tournament_id], callback);
};

User.findByJoinCode = (joinCode, callback) => {
  const query = 'SELECT * FROM tournament WHERE join_code = ?';
  db.query(query, [joinCode], callback);
};


User.createMemberRequest = (request, callback) => {
  const { tournamentId, regNo, role, position, teamName, teamLogo } = request;
  const query = 'INSERT INTO member_request (tournament_id, reg_no, role, position, team_name, team_logo) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [tournamentId, regNo, role, position, teamName, teamLogo], callback);
};

User.getMemberRequests = (tournamentId, callback) => {
  const query = `
    SELECT 
      mr.*,
      t.tournament_name,
      u.name AS name
    FROM 
      member_request mr
    JOIN 
      tournament t ON mr.tournament_id = t.tournament_id
    JOIN 
      users u ON mr.reg_no = u.reg_no
    WHERE 
      mr.tournament_id = ?;
  `;
  db.query(query, [tournamentId], callback);
};

User.createParticipatedTournament = (participation, callback) => {
  const { tournamentId, regNo, role } = participation;
  const query = 'INSERT INTO participated_tournament (tournament_id, reg_no, role) VALUES (?, ?, ?)';
  db.query(query, [tournamentId, regNo, role], callback);
};

User.getTournamentCoins = (tournamentId, callback) => {
  const query = 'SELECT per_team_coin, player_base_coin FROM tournament WHERE tournament_id = ?';
  db.query(query, [tournamentId], callback);
};

User.createTeam = (team, callback) => {
  const { tournamentId, regNo, teamName, teamLogo, coin } = team;
  const query = 'INSERT INTO team (tournament_id, reg_no, team_name, team_logo, coin) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [tournamentId, regNo, teamName, teamLogo, coin], callback);
};

User.createPlayer = (player, callback) => {
  const { tournamentId, regNo, position, playerPrice } = player;
  const query = 'INSERT INTO player (tournament_id, reg_no, position, player_price) VALUES (?, ?, ?, ?)';
  db.query(query, [tournamentId, regNo, position, playerPrice], callback);
};

User.deleteMemberRequest = (requestId, callback) => {
  const query = 'DELETE FROM member_request WHERE request_id = ?';
  db.query(query, [requestId], callback);
};

User.getPlayersByTournament = (tournamentId, callback) => {
  const query = `
    SELECT p.*, u.name, t.sport_type 
    FROM player p
    JOIN users u ON p.reg_no = u.reg_no
    JOIN tournament t ON p.tournament_id = t.tournament_id
    WHERE p.tournament_id = ?
  `;
  db.query(query, [tournamentId], callback);
};

User.updatePlayerCategories = (players, callback) => {
  const queries = players.map(player => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE player 
        SET category = ? 
        WHERE tournament_id = ? AND reg_no = ?
      `;
      db.query(query, [player.category, player.tournament_id, player.reg_no], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  });

  Promise.all(queries)
    .then(results => callback(null, results))
    .catch(err => callback(err));
};


User.getTeamDetailsByManager = (regNo, tournament_id, callback) => {
  const query = `
    SELECT t.team_id,t.team_name,t.team_logo, u.name 
    FROM team as t 
    JOIN users as u on t.reg_no = u.reg_no 
    WHERE t.tournament_id = ? AND t.reg_no = ?;
  `;
  db.query(query, [tournament_id, regNo], callback);
};

User.getTeamDetailsByPlayer = (regNo, tournament_id, callback) => {
  const query = `
    SELECT T.team_id,T.team_name,T.team_logo, U.name
    FROM team as T 
    JOIN users as U ON T.reg_no = U.reg_no 
    WHERE T.team_id = 
      (SELECT team_id FROM player WHERE tournament_id = ? AND reg_no = ?);
  `;
  db.query(query, [tournament_id, regNo], callback);
};

User.getTeamPlayersByPlayer = (regNo, tournament_id, callback) => {
  const query = `
    SELECT U.name , P.position , p.category , p.player_price as value 
    FROM player as P 
    JOIN users as U ON P.reg_no = U.reg_no 
    WHERE team_id =  
      (SELECT team_id FROM player WHERE reg_no = ? AND tournament_id = ?);
    `;
  db.query(query, [regNo, tournament_id], callback);
};

User.getPlayersInTeam = (team_id, tournament_id, callback) => {
  const query = `
    SELECT u.name, p.position ,p.category , p.player_price as value
    FROM player as p 
    JOIN users as u on p.reg_no = u.reg_no
    WHERE tournament_id = ? AND team_id = ?
  `;
  db.query(query, [tournament_id, team_id], callback);
};


User.getTeamsInTournament = (tournamentId, callback) => {
  const query = `
    SELECT t.team_name,t.team_logo,u.name 
    FROM team as t 
    JOIN users as u on t.reg_no = u.reg_no 
    WHERE t.tournament_id = ?;
  `;
  db.query(query, [tournamentId], callback);
};

User.startAuction = (tournament_id, callback) => {
  const query = 'UPDATE auction_page SET start = true WHERE tournament_id = ?';
  db.query(query, [tournament_id], callback);
};

module.exports = User;
