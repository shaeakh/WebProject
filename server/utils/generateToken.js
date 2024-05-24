const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, 'your_jwt_secret', {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
