let google = require('googleapis');
let privatekey = require("../services/Quickstart-6e2b243db1f8.json");

function googleAutenticate() {
    let jwtClient = new google.auth.JWT(
        privatekey.client_email,
        null,
        privatekey.private_key,
        ['https://www.googleapis.com/auth/calendar']);
    //authenticate request
    jwtClient.authorize(function (err, tokens) {
        if (err) {
            return console.log(err);
        } else {
            console.log("Successfully connected!")
            return jwtClient;
        }
    });
}

function getAllEvents(req,res) {
    //Google Calendar API
    let calendar = google.calendar('v3');
    calendar.events.list({
        auth: googleAutenticate(),
        calendarId: 'primary'
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return res.status(500).send(err);
        }
        var events = response.items;
        if (events.length == 0) {
            console.log('No events found.');
            return res.status(206).send({'Error':'No hay eventos registrados'})
        } else {
            console.log('Event from Google Calendar:');
            // for (let event of response.items) {
            //     console.log('Event name: %s, Creator name: %s, Create date: %s', event.summary, event.creator.displayName, event.start.date);
            // }
            return res.status(200).send(response.data.items);
        }
    });
}

module.exports = {
    getAllEvents
}
