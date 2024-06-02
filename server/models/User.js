const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {};

User.create = (user, callback) => {
  const { name, edu_mail, phone, regNo, department, userPic, password } = user;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = 'INSERT INTO users (reg_no, name, edu_mail, phone, department, user_pic, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [regNo, name, edu_mail, phone, department, userPic, hashedPassword], callback);
};

User.findByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE edu_mail = ?';
  db.query(query, [email], callback);
};

User.findById = (id, callback) => {
  const query = 'SELECT * FROM users WHERE reg_no = ?';
  db.query(query, [id], callback);
};


User.update = (regNo, user, callback) => {
  const { name, phone, userPic, password } = user;
  const hashedPassword = password ? bcrypt.hashSync(password, 10) : null;

  const query = `UPDATE users SET name = ?, phone = ?, user_pic = ?, password = ? WHERE reg_no = ?`;
  db.query(query, [name, phone, userPic, hashedPassword, regNo], callback);
};


User.updateByEmail = (email, user, callback) => {
  const { name, phone, userPic, password } = user;
  const query = 'UPDATE users SET name = ?, phone = ?, user_pic = ?, password = ? WHERE edu_mail = ?';
  db.query(query, [name, phone, userPic, password, email], callback);
};


User.findTournamentsByUser = (regNo, callback) => {
  const query = `
    SELECT tournament.* FROM tournament
    INNER JOIN player ON tournament.tournament_id = player.tournament_id
    WHERE player.reg_no = ?`;
  db.query(query, [regNo], callback);
};


User.createTournament = (tournament, callback) => {
  const { tournamentName, sportType, tournamentDate, logoPic, joinCode, regNo, playerBaseCoin, perTeamCoin } = tournament;
  const query = 'INSERT INTO tournament (tournament_name, sport_type, tournament_date, tournament_logo, join_code, reg_no, player_base_coin, per_team_coin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [tournamentName, sportType, tournamentDate, logoPic, joinCode, regNo, playerBaseCoin, perTeamCoin], callback);
};

User.findTournamentByJoinCode = (joinCode, callback) => {
  const query = 'SELECT * FROM tournament WHERE join_code = ?';
  db.query(query, [joinCode], callback);
};

User.createMemberRequest = (memberRequest, callback) => {
  const { tournamentId, regNo, role } = memberRequest;
  const query = 'INSERT INTO member_request (tournament_id, reg_no, role) VALUES (?, ?, ?)';
  db.query(query, [tournamentId, regNo, role], callback);
};

User.createPlayer = (player, callback) => {
  const { tournamentId, regNo, position, category } = player;
  const query = 'INSERT INTO player (tournament_id, reg_no, position, catagory) VALUES (?, ?, ?, ?)';
  db.query(query, [tournamentId, regNo, position, category], callback);
};

User.createManager = (manager, callback) => {
  const { tournamentId, regNo, teamName, teamLogo } = manager;
  const query = 'INSERT INTO manager (tournament_id, reg_no, team_name, team_logo) VALUES (?, ?, ?, ?)';
  db.query(query, [tournamentId, regNo, teamName, teamLogo], callback);
};
module.exports = User;
