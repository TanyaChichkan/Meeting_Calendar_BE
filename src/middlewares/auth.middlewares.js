const { verifyToken } = require('../services/token.services');
const UsersDB = require('../model/users.model');

const checkAuthTokenMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  try {
    if (!token) {
      return res.json({
        status: 'Unauthorized',
        code: 401,
        message: 'No token provided',
      });
    }

    const data = await verifyToken(token);
    req.userId = data.id;
    const userInfo = await UsersDB.findUserById(data._id);
    req.user = userInfo;
    return next();
  } catch (e) {
    return res.json({
      status: 'Unauthorized',
      code: 401,
      message: 'Invalid token',
    });
  }
};

module.exports = {
  checkAuthTokenMiddleware,
};
