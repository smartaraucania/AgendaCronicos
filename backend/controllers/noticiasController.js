//Twitter.js
var Twitter = require('twitter');
var config = require('../config');
var moment = require('moment');

/**
 * Metodo que permite obtener tweets realizados por una cuenta en especifico
 * @param {*} req 
 * @param {*} res 
 */
function getTweets(req, res) {
    //Twitter.js
    var client = new Twitter({
        consumer_key: config.twitterApikey,
        consumer_secret: config.twitterApikeySecret,
        access_token_key: config.twitterAccesstoken,
        access_token_secret: config.twitterAccesstokenSecret
    });
    var params = {
        screen_name: 'DSMTemuco',
        include_rts: false,
        tweet_mode: 'extended' 
    }

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) return res.status(400).send(error);

        tweets =  tweets.map(tweet => ({
            tweet,
            created_at_fecha: moment(new Date(tweet.created_at)).format("YYYY-MM-DD"),
            created_at_hora: moment(new Date(tweet.created_at)).format("HH:mm")
        }));

        return res.status(200).send(tweets);
    });

}

module.exports = {
    getTweets
}