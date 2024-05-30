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

module.exports = User;
