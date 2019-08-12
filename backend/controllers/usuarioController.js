const User = require('../models/usuario');
const bcrypt = require('bcrypt-nodejs');

//Para encryptar password
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);

/**
 * Metodo que permite al obtener los datos del usuario logeado
 * @param {*} req 
 * @param {*} res 
 */
function getMe(req, res) {

    User.findById(req.user.id).populate('medicoCabecera enfermedadCronica cesfam').exec((err, userLog) => {
        if (err) return res.status(400).send(err);
        if (!userLog) return res.status(204).send("Usuario no existe registrados");

        return res.status(200).send(userLog);
    });
}

/**
 * Metodo que permite al usuario logeado editar sus datos personales
 * @param {*} req 
 * @param {*} res 
 */
function editMe(req, res) {
    User.findById(req.user.id).populate('medicoCabecera enfermedadCronica cesfam').exec((err, user) => {
        if (err) return res.status(400).send(err.message);

        user.correo = req.body.correo;
        user.nombre = req.body.nombre;
        user.apellido = req.body.apellido;
        user.telefono = req.body.telefono;
        if (req.user.rol == 2) {
            user.fechaNacimiento = req.body.fechaNacimiento;
            user.direccion = req.body.direccion;
        }

        user.save((err) => {
            if (err) return res.status(401).send({ 'Error': "Un error ha ocurrido con la Base de datos" });

            return res.status(200).send(user);
        });
    });

}

/**
 * Metodo que permite al usuario logeado editar su contraseña
 * @param {*} req 
 * @param {*} res 
 */
function editPass(req, res) {
    var oldPassword = req.body.oldPassword || '';
    var newPassword = req.body.newPassword || '';
    var confirmPasword = req.body.confirmPasword || '';

    User.findById(req.user.id).select('+password').populate('medicoCabecera enfermedadCronica cesfam').exec((err, user) => {
        if (err) return res.status(500).send(err.message);
        if (oldPassword == '' || newPassword == '' || confirmPasword == '') return res.status(400).send({ 'Error': "ingrese datos necesarios" });
        if (!bcrypt.compareSync(oldPassword, user.password)) return res.status(400).send({ 'Error': "Contraseña antigua incorrecta" });
        if (newPassword != confirmPasword) return res.status(400).send({ 'Error': "Las contraseñas no coinciden" });
        user.password = bcrypt.hashSync(newPassword, salt);
        user.save((err) => {
            if (err) return res.status(401).send({ 'Error': "Un error ha ocurrido con la Base de datos" });
            return res.status(200).send(user);
        });
    });
}


module.exports = {
    getMe,
    editMe,
    editPass
}