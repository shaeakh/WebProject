const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');
const fs = require('fs');


const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@student\.sust\.edu$/;
  return regex.test(email);
};

// Register new user
exports.registerUser = (req, res) => {
  const { name, edu_mail, phone, regNo, department, password } = req.body;
  const userPicUrl = req.file ? req.file.cloudinaryUrl : "/uploads/avatar.png";

  // Validate email
  if (!isValidEmail(edu_mail)) {
    return res.status(400).json({ message: 'Invalid email domain. Only @student.sust.edu emails are allowed.' });
  }

  const newUser = {
    name,
    edu_mail,
    phone,
    regNo,
    department,
    userPicUrl,
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

// Authenticate user
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
      const token = generateToken(user.reg_no);
      res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  });
};

// Logout user
exports.logoutUser = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};

// Update user details
exports.updateUser = (req, res) => {
  const { name, phone, newPassword } = req.body;
  const userPicUrl = req.file ? req.file.cloudinaryUrl : null;
  const { email, password } = req.body;

  User.findByEmail(email, (err, users) => {
    if (err) throw err;
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = users[0];
    if (bcrypt.compareSync(password, user.password)) {
      const updatedUser = {
        name: name || user.name,
        phone: phone || user.phone,
        userPicUrl: userPicUrl || user.userPicUrl,
        password: newPassword ? bcrypt.hashSync(newPassword, 10) : user.password,
      };

      User.updateByEmail(email, updatedUser, (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error updating user', error: err });
        }
        res.status(200).json({ message: 'User updated successfully' });
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  });
};
