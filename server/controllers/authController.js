const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

exports.registerUser = (req, res) => {
  const { name, email, phone, regNo, department, idCardPic, userPic, password } = req.body;

  User.findByEmail(email, (err, users) => {
    if (err) throw err;
    if (users.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    User.create({ name, email, phone, regNo, department, idCardPic, userPic, password }, (err, result) => {
      if (err) throw err;
      res.status(201).json({
        message: 'User registered',
        token: generateToken(result.insertId)
      });
    });
  });
};

exports.authUser = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, users) => {
    if (err) throw err;
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = users[0];
    if (bcrypt.compareSync(password, user.password)) {
      res.json({
        token: generateToken(user.id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  });
};
