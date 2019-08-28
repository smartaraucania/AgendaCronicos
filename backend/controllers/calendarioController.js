const ics = require('ics');
const { writeFileSync } = require('fs');

function createEvent(req, res) {

    const date = new Date(req.body.horaAtencion);
    const event = {
        start: [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours() + 4, date.getMinutes()],
        duration: { minutes: 30 },
        title: 'Hora atención',
        description: 'Atención medica, paciente: ' + req.body.pacienteNombre,
        location: req.body.cesfamNombre,
        geo: { lat: req.body.cesfamLat, lon: req.body.cesfamLong },
        status: 'CONFIRMED',
        organizer: { name: 'Admin', email: 'Race@BolderBOULDER.com' },
        attendees: [
            { name: 'Adam Gibbons', email: 'adam@example.com', rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' },
        ]
    }

    ics.createEvent(event, (error, value) => {
        if (error) {
            console.log(error)
            return res.status(500).send(error);
        }

        const file = writeFileSync(`event.ics`, value);
        return res.status(201).send(file);
    });

}

module.exports = {
    createEvent
}