    
'use strict'

const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/usuario');

function isAuth(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({'Error':'Debe estar logeado'});
    }

    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.decode(token, config.secret);
    
    User.findById(payload.id).exec((err,user)=>{
        if(err) return res.status(406).send({ 'Error': 'No se encontro un usuario asociado a la sesion' });
        if(user.token != token) return res.status(403).send({'Error':'Token ya expiro'});
        req.user = user;
        next();
    });
}

function hasRole(rol) {
    return function(req, res, next) {
      if (req.user.rol !== rol) return res.status(401).send({'Error':'Usuario no autorizado'});
      next();
    }
}


module.exports = {
        isAuth,
        hasRole
};