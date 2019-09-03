const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./config');

passport.use(
    new GoogleStrategy({
        //options for the google strat
        callbackURL:'/auth/google/redirect',
        clientID: keys.googleOAuth.clientID,
        clientSecret: keys.googleOAuth.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        //passport callback func
        console.log(profile);
    })
);

