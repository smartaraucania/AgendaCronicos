module.exports = {
    app: {
        port: process.env.PORT || 4000,
        db: process.env.MONGODB_URI || 'mongodb://localhost:27017/pCesfam', //process.env.MONGODB_URI
        secret: 'pcesfamtokensecret',
    },
    twitter: {
        apikey: 'KGcY2NadWRkBwPeNI3GS8AWn2',
        apikeySecret: 'aoB1eitjqMQJKJU2G8fxRA2lKwlKPyafuYccIrSr4LLb7P1g9Y',
        accesstoken: '233529822-bs5CjJsXqIDDWbdG6Gv2POoPZvmsjrvjW0dE6Rkw',
        accesstokenSecret: 'bq7FE1nBrGdaNHn0q0h3dmw04S4mQFKHmFrByXIk2n99m'
    },
    googleOAuth: {
        clientID: '1087058763481-upud01qlkoavdlcjc00eh2l798jodn0k.apps.googleusercontent.com',
        clientSecret: 'PTtoYY1grxD8xeYHdKwnWodX'
    }
}