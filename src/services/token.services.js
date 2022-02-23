const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const { ACCESS_KEY } = process.env;

const createVerifiedToken = async (payload) => {
  const token = await jwt.sign(payload, ACCESS_KEY, { expiresIn: '1h' });
  return `Bearer ${token}`;
};

const verifyToken = async (token) => {
  const parsedToken = token.replace('Bearer', '');
  return await jwt.verify(parsedToken, ACCESS_KEY);
};

module.exports = {
  createVerifiedToken,
  verifyToken,
};
