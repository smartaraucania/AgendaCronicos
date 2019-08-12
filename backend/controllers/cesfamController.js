Cesfam = require('../models/cesfam');
User = require('../models/usuario');

/**
 * Metodo que permite ingresar un nuevo cesfam al sistema
 * @param {*} req 
 * @param {*} res 
 */
function createCesfam(req,res){
    var cesfam = new Cesfam({
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        localizacion: {
            latitud: req.body.latitud,
            longitud: req.body.longitud
        },
        coordinador: req.body.coordinador
    });

    cesfam.save(function (err, cesfam) {
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
        return res.status(201).send(cesfam);
    });
}

/**
 * Metodo que permite obtener todos los cesfams registrados en el sistema
 * @param {*} req 
 * @param {*} res 
 */
function getAllCesfams(req,res){
    Cesfam.find().exec((err,cesfams)=>{
        if(err) res.status(400).send(err);
        if(!cesfams) res.status(204).send({'Error':'No existen cesfams registrados'});

        return res.status(200).send(cesfams);
    });
}

/**
 * Metodo que permite obtener un cesfam en especifico segun su id
 * @param {*} req 
 * @param {*} res 
 */
function getCesfamPorId(req,res){
    Cesfam.findById(req.params.cesfamId).exec((err,cesfam)=>{
        if(err) res.status(400).send(err);
        if(!cesfam) res.status(204).send({'Error':'No existe cesfam con esa id'});

        return res.status(200).send(cesfam);
    });
}

/**
 * MEtodo que permite eliminar un cesfam especifico segun su id
 * @param {*} req 
 * @param {*} res 
 */
function deleteCesfam(req,res){
    Cesfam.findById(req.params.cesfamId).exec(function (err, cesfam) {
        if (err) return res.status(400).send({ "Error": "Error de DB" });
        if (!cesfam) return res.status(204).send({ "Error": "No existe cesfam con esa id" });

        Cesfam.deleteOne({ _id: cesfam._id }).exec(function (err, rmv) {
            if (err) return res.status(400).send({ "Error": "Error de DB" });
            return res.status(200).send();
        });
       
    });
}

/**
 * Metodo que permite obtener todos los medicos asociados a un cesfam en especifico
 * @param {*} req 
 * @param {*} res 
 */
function getMedicosCesfam(req,res){
    User.find({
        cesfam:req.params.cesfamId,
        rol:1    
    }).exec((err,doctores)=>{
        if (err) return res.status(400).send({ "Error": "Error de DB" });
        if(!doctores) return res.status(204).send({'Error':'No hay doctores asociados a este cesfam'});

        return res.status(200).send(doctores);
    });
}

/**
 * Metodo que permite obtener todos los pacientes asociados a un cesfam en especifico
 * @param {*} req 
 * @param {*} res 
 */
function getPacientesCesfam(req,res){
    User.find({
        cesfam:req.params.cesfamId,
        rol:2   
    }).exec((err,pacientes)=>{
        if (err) return res.status(400).send({ "Error": "Error de DB" });
        if(!pacientes) return res.status(204).send({'Error':'No hay pacientes asociados a este cesfam'});

        return res.status(200).send(pacientes);
    });
}

module.exports={
    createCesfam,
    getAllCesfams,
    getCesfamPorId,
    deleteCesfam,
    getMedicosCesfam,
    getPacientesCesfam
}