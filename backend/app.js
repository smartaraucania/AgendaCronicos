'use strict'

const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();
const cors = require('cors');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

module.exports = app;