const Justificacion = require('../models/justificacion');

/**
 * Metodo que permite obtener todas las justificaciones asociadas a los medicos
 * @param {*} req 
 * @param {*} res 
 */
function getJustificacionesMedico(req, res) {
    Justificacion.find({
        tipoJustificacion: 1
    }).exec((err, justificaciones) => {
        if (err) return res.status(400).send(err);
        if (!justificaciones) return res.status(208).send({ 'Error': 'No existen justificaciones' });

        return res.status(200).send(justificaciones);
    });
}

/**
 * Metodo que permite obtener todas las justificaciones asociadas a los pacientes
 * @param {*} req 
 * @param {*} res 
 */
function getJustificacionesPaciente(req, res) {
    Justificacion.find({
        tipoJustificacion: 2
    }).exec((err, justificaciones) => {
        if (err) return res.status(400).send(err);
        if (!justificaciones) return res.status(206).send({ 'Error': 'No existen justificaciones' });

        return res.status(200).send(justificaciones);
    });
}

/**
 * Metodo que permite registrar una nueva justificacion en el sistema
 * @param {*} req 
 * @param {*} res 
 */
function createJustificacion(req, res) {

    var justificacion = new Justificacion({
        justificacion: req.body.justificacion,
        tipoJustificacion: req.body.tipoJustificacion
    });

    justificacion.save(function (err, justificacion) {
        if (err) {
            if (err.code == 11000) {
                var field = err.message.split("index:")[1];
                field = field.split(" dup key")[0];
                field = field.substring(0, field.lastIndexOf("_"));
                return res.status(401).send({
                    "Error": "Un error ha ocurrido con el " + field + ", ya existe."
                });
            }
        }
        return res.status(201).send(justificacion);
    });
}

/**
 * Metodo que permite eliminar una justificacion especifica segun su id
 * @param {*} req 
 * @param {*} res 
 */
function deleteJustificacion(req, res) {
    Justificacion.findById(req.params.justificacionId).exec(function (err, justificacion) {
        if (err) return res.status(400).send({ "Error": "Error de DB" });
        if (!justificacion) return res.status(204).send({ "Error": "No existe cesfam con esa id" });

        Justificacion.deleteOne({ _id: justificacion._id }).exec(function (err, rmv) {
            if (err) return res.status(400).send({ "Error": "Error de DB" });
            return res.status(200).send();
        });

    });
}

module.exports = {
    getJustificacionesMedico,
    getJustificacionesPaciente,
    createJustificacion,
    deleteJustificacion
}