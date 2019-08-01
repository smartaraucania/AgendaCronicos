const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorialAtencionSchema = Schema({
    fechaCambio: String,
    fechaFormatCambio: Date,
    horaCambio: String,
    estado: Number, //0 Agendada 1 en transcurso, 2 finalizada, 3 cancelada, 4 re agendada
    justificacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Justificacion' },
    cambiadoPor: Number, //1 doctor, 2 paciente
});

module.exports = mongoose.model('HistorialAtencion', HistorialAtencionSchema);


