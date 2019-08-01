
const User = require('../models/usuario');
const bcrypt = require('bcrypt-nodejs');

//Para encryptar password
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);

function createPaciente(req,res) {

    User.findOne({
        telefono: req.body.rut,
        rol:1 
    }).exec((err,userFound)=>{
        if (err) return res.status(400).send(err);
        if (userFound) return res.status(204).send("Ya existe usuario con ese rut");

        var hashPass = bcrypt.hashSync(req.body.password, salt);

        const user = new User({
            rut: req.body.rut,
            correo: req.body.correo, 
            nombre: req.body.nombre, 
            apellido: req.body.apellido, 
            password: hashPass, 
            fechaNacimiento: req.body.fechaNacimiento,
            edad: req.body.edad,
            enfermedadCronica: req.body.enfermedadCronica, 
            cesfam: req.body.cesfam,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            medicoCabecera: req.user.id, 
            rol: 2
        });

        user.save((err) => {
            if (err) return res.status(500).send({ 'Error': `Error al crear paciente ` + err });

            return res.status(200).send(user);
        });

    });
}

function getAllPacientes(req, res) {
    User.find({ rol: 2 }).populate('medicoCabecera enfermedadCronica cesfam').exec((err, pacientes) => {
        if (err) return res.status(400).send(err);
        if (!pacientes) return res.status(204).send("No hay pacientes registrados");

        return res.status(200).send(pacientes);
    });
}

function getPacientePorRut(req, res) {
    User.findOne({
        rut: req.params.rut,
        rol: 2
    }).populate('medicoCabecera enfermedadCronica cesfam').exec((err, paciente) => {
        if (err) return res.status(400).send(err);
        if (!paciente) return res.status(204).send("No existe paciente registrado con esa id");

        return res.status(200).send(paciente);
    });
}

function getPacientePorId(req, res) {
    User.findOne({
        _id: req.params.id,
        rol: 2
    }).populate('medicoCabecera enfermedadCronica cesfam').exec((err, paciente) => {
        if (err) return res.status(400).send(err);
        if (!paciente) return res.status(204).send("No existe paciente registrado con esa id");

        return res.status(200).send(paciente);
    });
}


module.exports = {
    createPaciente,
    getAllPacientes,
    getPacientePorRut,
    getPacientePorId
}

