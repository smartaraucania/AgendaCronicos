const gcal = require('google-calendar');
const User = require('../models/usuario');

/**
 * Metodo que obtiene los eventos de la agenda principal del usuario (google calendar) 
 * email= id de la agenda principal del usuario
 * accessToken= token provisto por google api para acceder a los servicios de google
 * @param {*} req 
 * @param {*} res 
 */
function getEvents(req, res) {
  const google_calendar = new gcal.GoogleCalendar(req.body.accessToken);

  google_calendar.events.list(req.body.email, function (err, calendarList) {
    if (err) return res.status(400).send(err);
    return res.status(200).send(calendarList);
  });

}

/**
 * Metodo que agrega un evento a la agenda principal del usuario (google calendar)
 * email= id de la agenda principal del usuario
 * accessToken= token provisto por google api para acceder a los servicios de google
 * @param {*} req 
 * @param {*} res 
 */
function addEvent(req, res) {
  const google_calendar = new gcal.GoogleCalendar(req.body.accessToken);

  var horaInicio = new Date(req.body.inicio);
  horaInicio.setHours(horaInicio.getHours() - 1);

  var horaFin = new Date(req.body.fin);
  horaFin.setHours(horaFin.getHours() - 1);

  const params = {
    "summary": req.body.titulo,
    "end": {
      "dateTime": horaFin
    },
    "start": {
      "dateTime": horaInicio
    }
  }

  google_calendar.events.insert(req.body.email, params, function (err, data) {
    if (err) return res.status(400).send(err);
    return res.status(200).send(data);
  });

}

/**
 * Metodo que guarda los datos referentes a la autenticacion con google y los asigna al usuario logeado
 * email= id de la agenda principal del usuario
 * accessToken= token provisto por google api para acceder a los servicios de google
 * @param {*} req 
 * @param {*} res 
 */
function saveGoogleData(req, res) {
  User.findById(req.user.id).exec((err, user) => {
    if (err) res.status(404).send(err);
    if (!user) res.status(404).send({ 'Error': 'No existe usuario con esa id' });

    user.googleAuth.accessToken = req.body.accessToken;
    user.googleAuth.email = req.body.email;

    user.save((err) => {
      if (err) return res.status(401).send({ 'Error': "Un error ha ocurrido con la Base de datos" });

      return res.status(200).send(user);
    });

  })
}


module.exports = {
  getEvents,
  addEvent,
  saveGoogleData
}
