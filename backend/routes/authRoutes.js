'use strict'

const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController.js');
const passport = require('passport');

authRouter.post('/register', authController.registrarMedico);
authRouter.post('/login', authController.loginUsuario);

module.exports = authRouter;