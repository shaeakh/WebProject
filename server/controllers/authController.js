const User = require('../models/User');
const { use } = require('../routes/authRoutes');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const db = require('../config/db');

const isValidEmail = (email) => {
  const regex = /^[a-zA-Z]+[0-9]*@student\.sust\.edu$/;
  return regex.test(email);
};

// Register new user
exports.registerUser = (req, res) => {
  const { name, email, phone, regNo, department, password,confirmPassword } = req.body;
  const userPicUrl = req.file ? req.file.cloudinaryUrl : "https://res.cloudinary.com/dsd4b2lkg/image/upload/v1718475943/kxrcwdacnp1vdbrwai6k.png";
  // console.log(userPicUrl);
  
  // Validate email
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email domain. Only @student.sust.edu emails are allowed.' });    
  }
  
    // Validate password and confirmation
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
      
    }

  if (!name || !phone || !regNo || !department || !password) {    
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  const newUser = {
    name,
    email,
    phone,
    regNo,
    department,
    userPicUrl,
    password
  };
  
  User.findByEmail(email, (err, users) => {
    if (err) {throw err;}
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
    // console.log(bcrypt.compareSync(password, user.password))
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user.reg_no);

      const data_and_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const query = `
      INSERT INTO activity_log (reg_no, activity_title, token, data_and_time)
      VALUES (?, ?, ?, ?)
    `;
    db.execute(query, [user.reg_no, 'User login', token, data_and_time], (err, results) => {
      if (err) {
        console.error('Error inserting activity log:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      // Send the token to the client
      res.cookie('token', token, { maxAge: 30 * 24 * 60 * 60 * 1000 });  // 30 days expiry
      res.json({ token });
    });
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

