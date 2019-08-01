const Atencion = require('../models/atencion');
const user = require('../models/usuario');
const moment = require('moment');
const HistorialAtencion = require('../models/historialAtencion');

//estados atencion = 0 agendada, 1 en transcurso, 2 finalizada, 3 cancelada, 4 re agendada
function getAtencionesDisponiblesDelDia(req, res) {

    var horasDisp = [];
    var horasAgendadas = [];
    var horaInicio = new Date(req.body.fecha + "T" + req.body.horaInicio + ":00.000Z");
    var horaFin = new Date(req.body.fecha + "T" + req.body.horaFin + ":00.000Z");

    var mediasHoras = difHorariaPorMediaHora(horaInicio, horaFin);

    Atencion.find(
        {
            $or: [{
                fecha: req.body.fecha,
                doctor: req.body.doctor,
                estado: 0
            }, {
                fecha: req.body.fecha,
                doctor: req.body.doctor,
                estado: 4
            }]
        }
    ).exec((err, atenciones) => {
        if (err) return res.status(500).send(err.message);

        var promises = [];
        promises.push(
            atenciones.forEach(element => {
                var atFechaFormat = element.fechaFormat;
                atFechaFormat.setHours(atFechaFormat.getHours() - 4);
                horasAgendadas.push(atFechaFormat.toString());
            })
        );
        return Promise.all(promises).then(response => {
            
            for (let i = 0; i < mediasHoras; i++) {
                var horaMod = new Date(horaInicio);
                horaMod.setMinutes(horaMod.getMinutes() + (30 * i));

                var horaV = new Date(horaMod);
                horaV.setHours(horaV.getHours() + 4);
                var horaVista = moment(horaV).format('HH:mm');
               
                var disponible = true;
                if (horasAgendadas.includes(horaMod.toString())) {
                    disponible = false;
                }


                var aten = {
                    horaDisp: horaMod,
                    horaVista: horaVista,
                    disp: disponible
                };

                horasDisp.push(aten);

            }
            return res.status(200).send(horasDisp);

        }).catch(err => {
            if (err) return res.status(500).send(err);
        });
    })
}

function getAtencionesAgendadasDoctorLogeado(req, res) {
    user.findById(req.user.id).exec((err, doctor) => {
        if (err) return res.status(400).send(err);
        if (!doctor) return res.status(204).send({ 'Error': 'No existen doctor registrado' });

        Atencion.find({
            doctor: req.user.id,
            estado: 0
        }).populate('doctor paciente justificacion').exec((err, atenciones) => {
            if (err) return res.status(400).send(err);
            if (!atenciones) return res.status(204).send({ 'Error': 'No existen atenciones registradas' });

            return res.status(200).send(atenciones);
        });
    });
}

function getAtencionesEnCursoDoctorLogeado(req, res) {
    user.findById(req.user.id).exec((err, doctor) => {
        if (err) return res.status(400).send(err);
        if (!doctor) return res.status(204).send({ 'Error': 'No existen doctor registrado' });

        Atencion.find({
            doctor: req.user.id,
            estado: 1
        }).populate('doctor paciente justificacion').exec((err, atenciones) => {
            if (err) return res.status(400).send(err);
            if (!atenciones) return res.status(204).send({ 'Error': 'No existen atenciones registradas' });

            return res.status(200).send(atenciones);
        });
    });
}

function getAtencionesCanceladasDoctorLogeado(req, res) {
    user.findById(req.user.id).exec((err, doctor) => {
        if (err) return res.status(400).send(err);
        if (!doctor) return res.status(204).send({ 'Error': 'No existen doctor registrado' });

        Atencion.find({
            doctor: req.user.id,
            estado: 3
        }).populate('doctor paciente justificacion').exec((err, atenciones) => {
            if (err) return res.status(400).send(err);
            if (!atenciones) return res.status(204).send({ 'Error': 'No existen atenciones registradas' });

            return res.status(200).send(atenciones);
        });
    });
}

function getAtencionesPacienteLogeado(req, res) {
    user.findById(req.user.id).exec((err, paciente) => {
        if (err) return res.status(400).send(err);
        if (!paciente) return res.status(204).send({ 'Error': 'No existen paciente registrado' });

        Atencion.find({
            paciente: req.user.id
        }).populate('doctor paciente justificacion').exec((err, atenciones) => {
            if (err) return res.status(400).send(err);
            if (!atenciones) return res.status(204).send({ 'Error': 'No existen atenciones registradas' });

            return res.status(200).send(atenciones);
        });
    });
}

function getAtencionesProximasMedicoLogeado(req, res) {
    user.findById(req.user.id).exec((err, doctor) => {
        if (err) return res.status(400).send(err);
        if (!doctor) return res.status(204).send({ 'Error': 'No existen medico registrado' });

        Atencion.find({
            doctor: req.user.id,
            fechaFormat: { "$gte": Date.now() }
        }).populate('doctor paciente justificacion').sort({ fechaFormat: 'asc' }).exec((err, atenciones) => {
            if (err) return res.status(400).send(err);
            if (!atenciones) return res.status(204).send({ 'Error': 'No existen atenciones registradas' });

            return res.status(200).send(atenciones);
        });
    });
}

function getAtencionesMedicoLogeado(req, res) {
    user.findById(req.user.id).exec((err, doctor) => {
        if (err) return res.status(400).send(err);
        if (!doctor) return res.status(204).send({ 'Error': 'No existen medico registrado' });

        Atencion.find({
            doctor: req.user.id
        }).populate('doctor paciente justificacion').sort({ fechaFormat: 'asc' }).exec((err, atenciones) => {
            if (err) return res.status(400).send(err);
            if (!atenciones) return res.status(204).send({ 'Error': 'No existen atenciones registradas' });

            return res.status(200).send(atenciones);
        });
    });
}

function getAtencionesPacientePorId(req, res) {
    user.findOne({
        _id: req.params.id,
        rol: 2
    }).exec((err, paciente) => {
        if (err) return res.status(400).send(err);
        if (!paciente) return res.status(204).send({ 'Error': 'No existe paciente registrado' });

        Atencion.find({
            paciente: req.params.id
        }).populate('doctor paciente justificacion').sort({ fechaFormat: 'desc' }).exec((err, atenciones) => {
            if (err) return res.status(400).send(err);
            if (!atenciones || atenciones.length == 0) return res.status(204).send({ 'Error': 'No existen atenciones registradas' });

            return res.status(200).send(atenciones);
        });
    });
}

function getAtencionActivaPaciente(req, res) {
    user.findById(req.user.id).exec((err, usuario) => {
        if (err) return res.status(400).send(err);
        if (!usuario) return res.status(204).send({ 'Error': 'No existen doctor registrado' });

        Atencion.findOne({
            $or: [{
                paciente: req.user.id,
                estado: 0
            }, {
                paciente: req.user.id,
                estado: 4
            }]
        }).populate('doctor paciente justificacion').exec((err, atencion) => {
            if (err) return res.status(400).send(err);
            if (!atencion) return res.status(204).send({ 'Error': 'No existen atencion activa' });

            return res.status(200).send(atencion);
        });
    });
}

function getAtencionPorId(req, res) {
    Atencion.findById(req.params.id).populate('doctor paciente')
        .populate({ path: 'historialAtencion', options: { sort: { 'fechaFormatCambio': 'desc' } } })
        .exec((err, atencion) => {
            if (err) return res.status(400).send(err);
            if (!atencion) return res.status(204).send({ 'Error': 'No existe atencion con esa id registrada' });

            return res.status(200).send(atencion);
        });
}

function agendarHoraPorPaciente(req, res) {
    var atencion = new Atencion({
        fecha: req.body.fecha,
        fechaFormat: req.body.fecha + 'T' + req.body.hora + ':00.000Z',
        hora: req.body.hora,
        doctor: req.body.doctor,
        paciente: req.user.id,
        agendadaPor: 2,
        estado: 0,
        historialAtencion: []
    });
    
    var fecha = new Date();
    var fechaActual = moment(Date.now());

    var fechaCambio = fechaActual.format('YYYY-MM-DD');
    var horaCambio = fechaActual.format('HH:mm');

    fecha.setHours(fecha.getHours() - 4);
    var historial = new HistorialAtencion({
        fechaCambio: fechaCambio,
        fechaFormatCambio: fecha,
        horaCambio: horaCambio,
        estado: 0,
        cambiadoPor: 2
    });

    Atencion.findOne(
        {
            $or: [{
                fecha: atencion.fecha,
                hora: atencion.hora,
                doctor: req.body.doctor,
                estado: 0
            }, {
                fecha: atencion.fecha,
                hora: atencion.hora,
                doctor: req.body.doctor,
                estado: 4
            }]
        }).exec((err, atencionFound) => {
            if (err) return res.status(400).send(err);
            if (atencionFound) return res.status(200).send({ 'Error': 'Ya existe atencion agendada con esos parametros' });
            if (difHoraria(atencion.fechaFormat) < 1) return res.status(404).send({ 'Error': 'Debe pedir atencion con almenos una hora de anticipación' });

            historial.save((err, hist) => {
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

                atencion.historialAtencion.push(hist);
                atencion.save((err, atencion) => {
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
                    return res.status(201).send(atencion);
                });
            })
        })
}

function agendarHoraPorDoctor(req, res) {
    var atencion = new Atencion({
        fecha: req.body.fecha,
        fechaFormat: req.body.fecha + 'T' + req.body.hora + ':00.000Z',
        hora: req.body.hora,
        doctor: req.user.id,
        paciente: req.body.paciente,
        agendadaPor: 1,
        estado: 0,
        historialAtencion: []
    });

    var fecha = new Date();
    var fechaActual = moment(Date.now());

    var fechaCambio = fechaActual.format('YYYY-MM-DD');
    var horaCambio = fechaActual.format('HH:mm');

    fecha.setHours(fecha.getHours() - 4);
    var historial = new HistorialAtencion({
        fechaCambio: fechaCambio,
        fechaFormatCambio: fecha,
        horaCambio: horaCambio,
        estado: 0,
        cambiadoPor: 1
    });

    Atencion.findOne(
        {
            $or: [{
                fecha: atencion.fecha,
                hora: atencion.hora,
                doctor: req.user.id,
                estado: 0
            }, {
                fecha: atencion.fecha,
                hora: atencion.hora,
                doctor: req.user.id,
                estado: 4
            }]
        }).exec((err, atencionFound) => {
            if (err) return res.status(400).send(err);
            if (atencionFound) return res.status(200).send({ 'Error': 'Ya existe atencion agendada con esos parametros' })
            difHoraria(atencion.fechaFormat);
            historial.save((err, hist) => {
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

                atencion.historialAtencion.push(hist);

                atencion.save((err, atencion) => {
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
                    return res.status(201).send(atencion);
                });
            })
        })
}

function cancelarAtencion(req, res) {
    var fecha = new Date();
    var fechaActual = moment(Date.now());

    var fechaCambio = fechaActual.format('YYYY-MM-DD');
    var horaCambio = fechaActual.format('HH:mm');

    fecha.setHours(fecha.getHours() - 4);
    

    var historial = new HistorialAtencion({
        fechaCambio: fechaCambio,
        fechaFormatCambio: fecha,
        horaCambio: horaCambio,
        estado: 3,
        cambiadoPor: req.user.rol
    });
    
    Atencion.findById(req.params.id).exec((err, atencion) => {
        if (err) return res.status(400).send(err);
        if (!atencion) return res.status(200).send({ 'Error': 'No existe atencion con esa id' });

        historial.save((err) => {
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

            atencion.historialAtencion.push(historial);
            //atencion.justificacion = req.params.justificacion;
            atencion.estado = 3;

            atencion.save((err) => {
                if (err) return res.status(401).send({ 'Error': "Un error ha ocurrido con la Base de datos" });

                return res.status(200).send(atencion);
            });

        });

    });
}

function finalizarAtencion(req, res) {
    var fecha = new Date();
    var fechaActual = moment(Date.now());

    var fechaCambio = fechaActual.format('YYYY-MM-DD');
    var horaCambio = fechaActual.format('HH:mm');

    fecha.setHours(fecha.getHours() - 4);
    console.log(fecha);

    var historial = new HistorialAtencion({
        fechaCambio: fechaCambio,
        fechaFormatCambio: fecha,
        horaCambio: horaCambio,
        estado: 2,
        cambiadoPor: req.user.rol
    });

    Atencion.findOne(
        {
            _id: req.params.id,
            estado: 1
        }
    ).exec((err, atencion) => {
        if (err) return res.status(400).send(err);
        if (!atencion) return res.status(200).send({ 'Error': 'No existe atencion en transcurso con esa id' });


        historial.save((err) => {
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

            atencion.historialAtencion.push(historial);
            atencion.observacion = req.body.observacion;
            atencion.estado = 2;

            atencion.save((err) => {
                if (err) return res.status(401).send({ 'Error': "Un error ha ocurrido con la Base de datos" });

                return res.status(200).send(atencion);
            });

        });

    });
}

function iniciarAtencion(req, res) {
    var fecha = new Date();
    var fechaActual = moment(Date.now());

    var fechaCambio = fechaActual.format('YYYY-MM-DD');
    var horaCambio = fechaActual.format('HH:mm');

    fecha.setHours(fecha.getHours() - 4);

    var historial = new HistorialAtencion({
        fechaCambio: fechaCambio,
        fechaFormatCambio: fecha,
        horaCambio: horaCambio,
        estado: 1,
        cambiadoPor: req.user.rol
    });
    Atencion.findOne(
        {
            $or: [{
                _id: req.params.id,
                estado: 0
            }, {
                _id: req.params.id,
                estado: 4
            }]
        }).exec((err, atencion) => {
            if (err) return res.status(400).send(err);
            if (!atencion) return res.status(200).send({ 'Error': 'No existe atencion con esa id' });

            historial.save((err) => {
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

                atencion.historialAtencion.push(historial);
                atencion.estado = 1;

                atencion.save((err) => {
                    if (err) return res.status(401).send({ 'Error': "Un error ha ocurrido con la Base de datos" });

                    return res.status(200).send(atencion);
                });

            });

        });
}

function reagendarAtencion(req, res) {
    var fecha = new Date();
    var fechaActual = moment(Date.now());

    var fechaCambio = fechaActual.format('YYYY-MM-DD');
    var horaCambio = fechaActual.format('HH:mm');

    fecha.setHours(fecha.getHours() - 4);

    var historial = new HistorialAtencion({
        fechaCambio: fechaCambio,
        fechaFormatCambio: fecha,
        horaCambio: horaCambio,
        estado: 4,
        cambiadoPor: req.user.rol
    });

    Atencion.findOne(
        {
            $or: [{
                _id: req.params.id,
                estado: 0
            }, {
                _id: req.params.id,
                estado: 4
            }]
        }).exec((err, atencion) => {
            if (err) return res.status(400).send(err);
            if (!atencion) return res.status(200).send({ 'Error': 'No existe atencion con esa id' });
           

            historial.save((err) => {
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

                atencion.fecha = req.body.fecha,
                atencion.fechaFormat = req.body.fecha + 'T' + req.body.hora + ':00.000Z',
                atencion.hora = req.body.hora
                atencion.historialAtencion.push(historial);
                atencion.justificacion = req.body.justificacion;
                atencion.observacion_justificacion = req.body.observacion_justificacion;
                atencion.estado = 4;
                difHoraria(atencion.fechaFormat);
                
                atencion.save((err) => {
                    if (err) return res.status(401).send({ 'Error': "Un error ha ocurrido con la Base de datos" });

                    return res.status(200).send(atencion);
                });

            });

        });

}

function difHoraria(hora) {
    hora.setHours(hora.getHours() + 4);
    //La diferencia se da en milisegundos así que debes dividir entre 1000
    var fecha1 = moment(Date.now());
    var fecha2 = moment(hora);

    return fecha2.diff(fecha1, 'hours');
}

function difHorariaPorMediaHora(horaInicio, horaFin) {
    var fecha1 = moment(horaInicio);
    var fecha2 = moment(horaFin);

    var mediasHoras = (fecha2.diff(fecha1, 'minutes') / 60) * 2;

    return mediasHoras;
}

module.exports = {
    getAtencionesPacienteLogeado,
    getAtencionesMedicoLogeado, //*rol
    getAtencionesProximasMedicoLogeado,
    getAtencionActivaPaciente, //rol
    getAtencionesAgendadasDoctorLogeado, //* rol
    getAtencionesEnCursoDoctorLogeado, //* rol
    getAtencionesCanceladasDoctorLogeado, //*rol
    getAtencionesPacientePorId,
    agendarHoraPorPaciente,
    agendarHoraPorDoctor,
    getAtencionPorId,
    finalizarAtencion,
    cancelarAtencion,
    iniciarAtencion,
    getAtencionesDisponiblesDelDia,
    reagendarAtencion
}
