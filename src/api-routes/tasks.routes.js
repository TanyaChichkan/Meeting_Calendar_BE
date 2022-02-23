const {
  getTasksContr,
  deleteTaskContr,
  createTaskContr,
} = require('../controllers/tasks.controllers');
const passport = require('passport');
const passportJWT = require('passport-jwt');

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = express.Router();

const bodyJSON = express.json();
const { checkAuthTokenMiddleware } = require('../middlewares/auth.middlewares');

router.get('/', checkAuthTokenMiddleware, getTasksContr);
router.post('/', bodyJSON, checkAuthTokenMiddleware, createTaskContr);
router.delete('/:taskId', checkAuthTokenMiddleware, deleteTaskContr);

module.exports = router;
