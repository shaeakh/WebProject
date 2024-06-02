const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@student\.sust\.edu$/;
  return regex.test(email);
};

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'your_jwt_secret');
      User.findById(decoded.id, (err, users) => {
        if (err || users.length === 0 ) {
          return res.status(401).json({ message: 'Not authorized' });
        }
        req.user = users[0];
        next();
      });
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = protect;
