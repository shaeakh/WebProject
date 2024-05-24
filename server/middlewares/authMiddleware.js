const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'your_jwt_secret');
      User.findById(decoded.id, (err, user) => {
        if (err || !user) {
          return res.status(401).json({ message: 'Not authorized' });
        }
        req.user = user;
        next();
      });
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = protect;
