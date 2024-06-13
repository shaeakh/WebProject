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


User.update = (regNo, user, callback) => {
  const { name, phone, userPicUrl, password } = user;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = `UPDATE users SET name = ?, phone = ?, user_pic_url = ?, password = ? WHERE reg_no = ?`;
  db.query(query, [name, phone, userPicUrl, hashedPassword, regNo], callback);
};


User.findTournamentsByUser = (regNo, callback) => {
  const query = `
    SELECT tournament.* FROM tournament
    INNER JOIN player ON tournament.tournament_id = player.tournament_id
    WHERE player.reg_no = ?`;
  db.query(query, [regNo], callback);
};


User.createTournament = (tournament, callback) => {
  const { tournamentName, sportType, tournamentDate, logoPicUrl, joinCode, regNo, playerBaseCoin, perTeamCoin } = tournament;
  const query = 'INSERT INTO tournament (tournament_name, sport_type, tournament_date, tournament_logo_url, join_code, reg_no, player_base_coin, per_team_coin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [tournamentName, sportType, tournamentDate, logoPicUrl, joinCode, regNo, playerBaseCoin, perTeamCoin], callback);
};


User.updateTournament = (tournamentId, tournament, regNo, callback) => {
  const { tournamentName, sportType, tournamentDate, playerBaseCoin, perTeamCoin, logoPicUrl } = tournament;

  const query = `
    UPDATE tournament 
    SET tournament_name = ?, sport_type = ?, tournament_date = ?, player_base_coin = ?, per_team_coin = ?, tournament_logo_url = ? 
    WHERE tournament_id = ? AND reg_no = ?`;
  db.query(query, [tournamentName, sportType, tournamentDate, playerBaseCoin, perTeamCoin, logoPicUrl, tournamentId, regNo], callback);
};


User.findCurrentTournamentByUser = (regNo, callback) => {
  const query = `
    SELECT tournament.* FROM tournament
    INNER JOIN player ON tournament.tournament_id = player.tournament_id
    WHERE player.reg_no = ?
    UNION
    SELECT tournament.* FROM tournament
    INNER JOIN manager ON tournament.tournament_id = manager.tournament_id
    WHERE manager.reg_no = ?`;
  db.query(query, [regNo, regNo], callback);
};

User.findParticipatedTournamentsByUser = (regNo, callback) => {
  const query = 'SELECT * FROM participated_tournament WHERE reg_no = ?';
  db.query(query, [regNo], callback);
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

User.getMemberRequests = (callback) => {
  const query = `
    SELECT mr.*, u.name 
    FROM member_request mr
    JOIN users u ON mr.reg_no = u.reg_no
  `;
  db.query(query, callback);
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
  const { tournamentId, regNo, teamName, teamLogo, coin} = team;
  const query = 'INSERT INTO team (tournament_id, reg_no, team_name, team_logo, coin) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [tournamentId, regNo, teamName, teamLogo, coin], callback);
};

User.createPlayer = (player, callback) => {
  const { tournamentId, regNo,position, playerPrice} = player;
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

module.exports = User;
