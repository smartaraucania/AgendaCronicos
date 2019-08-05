'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificacionSchema = Schema({
    fecha_creacion: String,
    hora_creacion: String,
    fechaFormat: Date,
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    titulo: String,
    texto: String,
    atencion: { type: mongoose.Schema.Types.ObjectId, ref: 'Atencion' }
});

module.exports = mongoose.model('Notificacion', NotificacionSchema);