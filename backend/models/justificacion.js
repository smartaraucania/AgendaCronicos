'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JustificacionSchema = Schema({
    justificacion: String,
    tipoJustificacion: Number //1: justificacion medico, 2: justificacion paciente
});

module.exports = mongoose.model('Justificacion', JustificacionSchema);