'use strict'

const mongoose = require('mongoose');
const User = require('../models/usuario');
const Service = require('../services/services');
const bcrypt = require('bcrypt-nodejs');

//Para encryptar password
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);

/**
 * Metodo que permite registrar medico en el sistema
 * @param {*} req 
 * @param {*} res 
 */
function registrarMedico(req, res) {
    //Valida que exista solo un medico con el mismo rut
    User.findOne({
        telefono: req.body.rut,
        rol:1
    }).exec((err, userFound) => {
        if (err) return res.status(500).send(err.message);

        if (userFound != null) return res.status(400).send({
            'Error': 'Ya existe medico con ese rut'
        });

        var hashPass = bcrypt.hashSync(req.body.password, salt);

        const user = new User({
            rut: req.body.rut,
            correo: req.body.correo,
            telefono: req.body.telefono,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            password: hashPass,
            cesfam:req.body.cesfam,
            rol:1
        })

        user.save((err) => {
            if (err) return res.status(500).send({ 'Error': `Error al crear medico ` + err });

            return res.status(200).send(user);
        });
    });
}

/**
 * Metodo que permite al usuario (medico o paciente) logearse al sistema
 * @param {*} req 
 * @param {*} res 
 */
function loginUsuario(req,res) {
    User.findOne({
        rut: req.body.rut
    }).select("+password").exec((err, user) => {
        if (err) return res.status(500).send(err.message);

        if (user == null) return res.status(404).send({
            "Error": "Usuario no encontrado"
        });

        bcrypt.compare(req.body.password, user.password, (err, decrypt) => {

            if (err) return res.status(500).send(err.message);

            if (decrypt) {

                var token = Service.createToken(user);
                user.token = token;

                user.save((err, user) => {
                    if (err) {
                        return res.status(401).send({
                            "error": "Un error ha ocurrido con la Base de datos"
                        });
                    }

                    return res.status(200).send({
                        "token": token
                    });
                });

            } else {
                return res.status(401).send({
                    "Error": "Contraseña no corresponde"
                });
            }
        });
    });
}

module.exports = {
    registrarMedico,
    loginUsuario
};