EnfermedadCronica = require('../models/enfermedadCronica');

function createCronica(req, res) {
    var cronica = new EnfermedadCronica({
        enfermedad: req.body.enfermedad
    });

    cronica.save(function (err, cronica) {
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
        return res.status(201).send(cronica);
    });
}

function getAllCronicas(req, res) {
    EnfermedadCronica.find().exec((err, cronicas) => {
        if (err) return res.status(400).send(err);
        if (!cronicas) return res.status(204).send({ 'Error': 'No existen enfermedades cronicas registradas' });

        return res.status(200).send(cronicas);
    });
}

function getCronicaPorId(req, res) {
    EnfermedadCronica.findById(req.params.cronicaId).exec((err, cronica) => {
        if (err) return res.status(400).send(err);
        if (!cronica) return res.status(204).send({ 'Error': 'No existe enfermedad cronica registrada con esa id' });

        return res.status(200).send(cronica);
    });
}

function deleteCronica(req, res) {
    EnfermedadCronica.findById(req.params.cronicaId).exec(function (err, cronica) {
        if (err) return res.status(400).send({ "Error": "Error de DB" });
        if (!cronica) return res.status(204).send({ "Error": "No existe cesfam con esa id" });

        EnfermedadCronica.deleteOne({ _id: cronica._id }).exec(function (err, rmv) {
            if (err) return res.status(400).send({ "Error": "Error de DB" });
            return res.status(200).send();
        });

    });
}

module.exports = {
    createCronica,
    getAllCronicas,
    getCronicaPorId,
    deleteCronica
};