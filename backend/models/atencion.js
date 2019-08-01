'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AtencionSchema = Schema({
    fecha: String,
    fechaFormat: Date,
    hora: String,
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', require: true },
    paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', require: true },
    observacion: String,
    estado: Number, //0 Agendada 1 en transcurso, 2 finalizada, 3 cancelada, 4 re agendada
    justificacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Justificacion' },
    observacion_justificacion: String,
    agendadaPor: Number, //1 doctor, 2 paciente
    historialAtencion: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HistorialAtencion' }]
});

module.exports = mongoose.model('Atencion', AtencionSchema);


