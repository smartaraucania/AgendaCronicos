const moment = require('moment');
const Notificacion = require('../models/notificacion');

/**
 * Permite crear notificaciones para vista notificaciones
 * @param {*} req 
 * @param {*} res 
 */
function createNotificacion(req, res) {
    const notificacion = new Notificacion({
        fecha_creacion: req.body.fecha,
        hora_creacion: req.body.hora,
        fechaFormat: req.body.fecha + 'T' + req.body.hora + ':00.000Z',
        doctor: req.body.doctor,
        paciente: req.body.paciente,
        titulo: req.body.titulo,
        texto: req.body.texto,
        atencion: req.body.atencion
    });

    notificacion.save((err) => {
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
        return res.status(201).send(notificacion);
    });
}

/**
 * Obtine las notificaciones del paciente logeado desde un rango de tiempo
 * @param {*} req 
 * @param {*} res 
 */
function getNotificacionesPaciente(req, res) {
    Notificacion.find({
        paciente: req.user.id,
        fechaFormat: { "$gte": req.body.desde }
    }).populate('paciente doctor').sort({ fechaFormat: 'desc' }).exec((err, notificaciones) => {
        if (err) return res.status(500).send(err);
        if (!notificaciones) return res.status(400).send({ 'Error': 'No hay notificaciones registradas' });

        return res.status(200).send(notificaciones);
    });
}

/**
 * Obtine las notificaciones del doctor logeado desde un rango de tiempo
 * @param {*} req 
 * @param {*} res 
 */
function getNotificacionesDoctor(req, res) {
    Notificacion.find({
        doctor: req.user.id,
        fechaFormat: { "$gte": req.body.desde }
    }).populate('paciente doctor').sort({ fechaFormat: 'desc' }).exec((err, notificaciones) => {
        if (err) return res.status(500).send(err);
        if (!notificaciones) return res.status(400).send({ 'Error': 'No hay notificaciones registradas' });

        return res.status(200).send(notificaciones);
    });
}

module.exports = {
    createNotificacion,
    getNotificacionesDoctor,
    getNotificacionesPaciente
}