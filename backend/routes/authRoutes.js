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
// passport.authenticate('google'),
authRouter.get('/google/redirect', (req, res) => {
    res.send('autenticado');
})

module.exports = authRouter;