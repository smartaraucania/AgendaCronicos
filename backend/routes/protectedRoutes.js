'use strict'

const express = require('express');
const protectedRouter = express.Router();
const middleware = require('../middlewares/middlewares.js');

const pacienteController = require('../controllers/pacienteController');
const medicoController = require('../controllers/medicoController');
const usuarioController = require('../controllers/usuarioController');
const atencionController = require('../controllers/atencionController');
const notificacionController = require('../controllers/notificacionController');

const googleCalendar = require('../controllers/googleCalendarController');

// roles: 1-Medico 2-Paciente

//Paciente routes
protectedRouter.post('/paciente',middleware.isAuth, middleware.hasRole(1),pacienteController.createPaciente);

//Medico routes
protectedRouter.get('/doctor/:medicoCabeceraId/pacientes',middleware.isAuth,middleware.hasRole(1),medicoController.getPacientesDoctor);

//Usuario routes
protectedRouter.get('/me',middleware.isAuth, usuarioController.getMe);
protectedRouter.put('/me',middleware.isAuth, usuarioController.editMe);
protectedRouter.put('/me/password',middleware.isAuth,usuarioController.editPass);

//Atencion routes
protectedRouter.get('/atencion/:id',middleware.isAuth,atencionController.getAtencionPorId);
protectedRouter.put('/atencion/:id/finalizar',middleware.isAuth,middleware.hasRole(1),atencionController.finalizarAtencion);
protectedRouter.put('/atencion/:id/cancelar',middleware.isAuth,atencionController.cancelarAtencion);
protectedRouter.put('/atencion/:id/iniciar',middleware.isAuth,middleware.hasRole(1),atencionController.iniciarAtencion);
protectedRouter.put('/atencion/:id/reagendar',middleware.isAuth, atencionController.reagendarAtencion);
//Atenciones doctor
protectedRouter.get('/doctor/atenciones',middleware.isAuth,middleware.hasRole(1),atencionController.getAtencionesMedicoLogeado);
protectedRouter.get('/doctor/atenciones/proximas',middleware.isAuth,middleware.hasRole(1),atencionController.getAtencionesProximasMedicoLogeado);
protectedRouter.get('/doctor/atenciones/agendadas',middleware.isAuth,middleware.hasRole(1),atencionController.getAtencionesAgendadasDoctorLogeado);
protectedRouter.get('/doctor/atenciones/encurso',middleware.isAuth,middleware.hasRole(1),atencionController.getAtencionesEnCursoDoctorLogeado);
protectedRouter.get('/doctor/atenciones/canceladas',middleware.isAuth,middleware.hasRole(1),atencionController.getAtencionesCanceladasDoctorLogeado);
protectedRouter.post('/doctor/agendar',middleware.isAuth,middleware.hasRole(1),atencionController.agendarHoraPorDoctor);
//Atenciones paciente
protectedRouter.get('/paciente/atenciones',middleware.isAuth,middleware.hasRole(2),atencionController.getAtencionesPacienteLogeado);
protectedRouter.get('/paciente/atencion/activa',middleware.isAuth,middleware.hasRole(2),atencionController.getAtencionActivaPaciente);
protectedRouter.get('/paciente/:id/atenciones',middleware.isAuth,middleware.hasRole(1),atencionController.getAtencionesPacientePorId);
protectedRouter.post('/paciente/agendar',middleware.isAuth,middleware.hasRole(2),atencionController.agendarHoraPorPaciente);

//Notificaciones Routes
protectedRouter.post('/notificaciones/paciente',middleware.isAuth,middleware.hasRole(2), notificacionController.getNotificacionesPaciente);
protectedRouter.post('/notificaciones/doctor', middleware.isAuth, middleware.hasRole(1), notificacionController.getNotificacionesDoctor);

//Calendario
protectedRouter.post('/events',middleware.isAuth, googleCalendar.getEvents);
protectedRouter.post('/event/add',middleware.isAuth, googleCalendar.addEvent);
protectedRouter.post('/google/save', middleware.isAuth, googleCalendar.saveGoogleData);

module.exports = protectedRouter;