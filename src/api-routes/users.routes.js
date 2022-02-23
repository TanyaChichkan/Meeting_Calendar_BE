const express = require('express');
const {
  registrationController,
  loginController,
  logoutController,
  refreshController,
} = require('../controllers/auth.controllers');
const {
  registrationValidatorMiddleware,
  logInvalidationMiddleware,
} = require('../validators/auth.validator');
const { checkAuthTokenMiddleware } = require('../middlewares/auth.middlewares');

const authRouter = express.Router();

authRouter.post(
  '/register',
  registrationValidatorMiddleware,
  registrationController
);
authRouter.post('/login', logInvalidationMiddleware, loginController);
authRouter.post('/logout', checkAuthTokenMiddleware, logoutController);
authRouter.post('/refresh', checkAuthTokenMiddleware, refreshController);

module.exports = authRouter;
