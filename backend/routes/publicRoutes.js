'use strict'

const express = require('express');
const publicRouter = express.Router();

const cesfamController = require('../controllers/cesfamController');
const enfermedadCronicaController = require('../controllers/enfermedadCronicaController');
const pacienteController = require('../controllers/pacienteController');
const doctorController = require('../controllers/medicoController');
const justificacionController = require('../controllers/justificacionController');
const noticiasController = require('../controllers/noticiasController');
const atencionController = require('../controllers/atencionController');
const notificacionController = require('../controllers/notificacionController');

//cesfam routes
publicRouter.get('/cesfams',cesfamController.getAllCesfams);
publicRouter.get('/cesfam/:cesfamId',cesfamController.getCesfamPorId);
publicRouter.post('/cesfam',cesfamController.createCesfam);
publicRouter.delete('/cesfam',cesfamController.deleteCesfam);
publicRouter.get('/cesfam/:cesfamId/medicos',cesfamController.getMedicosCesfam);
publicRouter.get('/cesfam/:cesfamId/pacientes',cesfamController.getPacientesCesfam);

//enfermedad cronica routes
publicRouter.get('/cronicas', enfermedadCronicaController.getAllCronicas);
publicRouter.get('/cronica/:cronica', enfermedadCronicaController.getCronicaPorId);
publicRouter.post('/cronica',enfermedadCronicaController.createCronica);
publicRouter.delete('/cronica',enfermedadCronicaController.deleteCronica);

//paciente routes
publicRouter.get('/pacientes',pacienteController.getAllPacientes);
publicRouter.get('/paciente/rut/:rut',pacienteController.getPacientePorRut);
publicRouter.get('/paciente/:id',pacienteController.getPacientePorId);

//doctor routes
publicRouter.get('/medicos',doctorController.getAllDoctores);
publicRouter.get('/medico/:rut',doctorController.getDoctorPorRut);

//justificacion routes
publicRouter.get('/justificaciones/medico',justificacionController.getJustificacionesMedico);
publicRouter.get('/justificaciones/paciente',justificacionController.getJustificacionesPaciente);
publicRouter.post('/justificacion',justificacionController.createJustificacion);
publicRouter.delete('/justificacion',justificacionController.deleteJustificacion);

//noticias routes
publicRouter.get('/noticias',noticiasController.getTweets);

//atencion routes
publicRouter.post('/atencion/disponibles',atencionController.getAtencionesDisponiblesDelDia);

//notificacion routes
publicRouter.post('/notificacion', notificacionController.createNotificacion);



module.exports = publicRouter;