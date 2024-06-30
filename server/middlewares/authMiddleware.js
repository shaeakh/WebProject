const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    User.findByRegNo(decoded.id, (err, users) => {
      if (err || users.length === 0) {
        return res.status(401).json({ message: 'Not authorized' });
      }
      req.user = users[0];
      next();
    });
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = { protect };
