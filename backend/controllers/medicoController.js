const User = require('../models/usuario');

function getAllDoctores(req, res) {
    User.find({ rol: 1 }).populate('cesfam').exec((err, doctores) => {
        if (err) return res.status(400).send(err);
        if (!doctores) return res.status(204).send("No hay doctores registrados");

        return res.status(200).send(doctores);
    });
}

function getDoctorPorRut(req, res) {
    User.findOne({
        rut: req.params.rut,
        rol: 1
    }).exec((err, doctor) => {
        if (err) return res.status(400).send(err);
        if (!doctor) return res.status(204).send("No existe doctor registrado con esa id");

        return res.status(200).send(doctor);
    });
}

function getPacientesDoctor(req,res) {

    User.findById(req.params.medicoCabeceraId).exec((err,doctor)=>{
        if (err) return res.status(400).send(err);
        if (!doctor) return res.status(204).send("No existe doctor registrado con esa id");

        User.find({
            medicoCabecera: req.params.medicoCabeceraId,
            rol: 2
        }).populate('enfermedadCronica cesfam medicoCabecera').exec((err, pacientes) => {
            if (err) return res.status(400).send(err);
            if (!pacientes) return res.status(204).send("No existen pacienten registrados para ese doctor");
    
            return res.status(200).send(pacientes);
        });
    });
}

module.exports={
    getAllDoctores,
    getDoctorPorRut,
    getPacientesDoctor
}