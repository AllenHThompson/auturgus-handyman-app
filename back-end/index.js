var express = require('express');
var app = express();
var User = require('./user');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var bcrypt = require('my-bcrypt');
var randomtoken = require('rand-token');
var cors = require('cors');

/* MongoDB Setup */
var creds = require('./mongo_creds.json');
mongoose.connect('mongodb://' + creds.username + ':' + creds.password + '@*.mlab.com:*/auturgus_app');

/* bcrypt Setup */
var saltRounds = 10;
var myEncryptedPassword = '';

app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

var serviceOptions = [
     "Mount a TV",
     "Mount 2 TVs",
     "Mount 3 TVs"
]

var myNewUser;

/* Routes */
app.get('/services', function(request, response) {
     response.json(serviceOptions)
})
