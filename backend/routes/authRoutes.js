'use strict'

const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController.js');
const passport = require('passport');

authRouter.post('/register', authController.registrarMedico);
authRouter.post('/login', authController.loginUsuario);

authRouter.get('/google', passport.authenticate('google', {
    scope: ['profile']
})
);
authRouter.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send('');
})

module.exports = authRouter;