const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@student\.sust\.edu$/;
  return regex.test(email);
};

exports.registerUser = (req, res) => {
  const { name, edu_mail, phone, regNo, department, password } = req.body;

    // Validate email
    if (!isValidEmail(edu_mail)) {
      return res.status(400).json({ message: 'Invalid email domain. Only @student.sust.edu emails are allowed.' });
    }

  const userPic = req.file ? fs.readFileSync(req.file.path) : null;

  const newUser = {
    name,
    edu_mail,
    phone,
    regNo,
    department,
    userPic,
    password
  };

  User.findByEmail(edu_mail, (err, users) => {
    if (err) throw err;
    if (users.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    User.create(newUser, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error registering user', error: err });
      }
      res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    });
  });
};

exports.authUser = (req, res) => {
  const { email, password } = req.body;

    // Validate email
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email domain. Only @student.sust.edu emails are allowed.' });
    }

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
