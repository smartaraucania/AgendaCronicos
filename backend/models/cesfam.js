'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CesfamSchema = Schema({
    nombre:String,
    telefono:String,
    direccion:String,
    localizacion: {
        latitud: {type: String},
        longitud: {type: String }
    },
    coordinador:String
});

module.exports = mongoose.model('Cesfam', CesfamSchema);