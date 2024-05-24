const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {};

User.create = (user, callback) => {
  const { name, email, phone, regNo, department, idCardPic, userPic, password } = user;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = 'INSERT INTO users (name, email, phone, reg_no, department, id_card_pic, user_pic, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [name, email, phone, regNo, department, idCardPic, userPic, hashedPassword], callback);
};

User.findByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], callback);
};

module.exports = User;
