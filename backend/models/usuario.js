'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = Schema({
    rut : {type: String, unique: true, required:true}, // D y P
    correo: {type: String, unique:true, required:true}, // D y P
    nombre: {type: String, required:true}, // D y P
    apellido: String, // D y P
    password: { type: String, select: false, required: true}, // D y P
    token: String, 
    firebaseToken: String,
    resetCode: Number,
    fechaNacimiento : String, 
    edad: Number,
    photoURL: String,
    medicoCabecera: { type:mongoose.Schema.Types.ObjectId, ref: 'Usuario' }, //attr del paciente
    enfermedadCronica: { type:mongoose.Schema.Types.ObjectId, ref: 'EnfermedadCronica' }, //attr del paciente
    cesfam: { type:mongoose.Schema.Types.ObjectId, ref: 'Cesfam' }, //attr del paciente
    direccion: String,
    telefono: {type:String, unique:true}, // D y P
    rol: {type:Number, require:true}, //1: doctor 2: paciente // D y P
    googleAuth: {
        accessToken: {type: String},
        email: {type: String }
    },
});

module.exports = mongoose.model('Usuario', UsuarioSchema);