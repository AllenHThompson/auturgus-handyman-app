var express = require('express');
var app = express();
var User = require('./requester');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var bcrypt = require('my-bcrypt');
var randomtoken = require('rand-token');
var cors = require('cors');

/* MongoDB Setup */
var creds = require('./mongo_creds.json');
mongoose.connect('mongodb://' + creds.username + ':' + creds.password + '@ds025782.mlab.com:25782/auturgus-handyman-app');


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
];

var myNewUser;

/* Routes */
app.get('/services', function(request, response) {
     response.json(serviceOptions);
})

app.post('/signup', function(request, response) {
     var credentials = request.body;
     console.log(credentials);
     Requester.findOne({_id: credentials._id}, function(err, res){
          if (err) {
               console.error(err.message);
               return;
          }
     if (res === null) {
          console.log('the requested user [' + credentials._id + '] was not located in the database. this is a new user');

               bcrypt.hash(credentials.password, saltRounds, function(err, hash) {
                    if (err) {
                         console.log('an error occurred hashing the password');
                         console.error(err.message);
                         return;
                    }
                    console.log('the encrypted password is [' + hash + '].');
                    myNewUser = new User({
                         _id: credentials._id, encryptedPassword: hash,
                         email: credentials.email
                    });
                    myNewUser.save(function(err) {
                         if (err) {
                              console.log('there was an error creating the new user in the database');
                              console.error(err.message);
                              console.log(err.errors);
                              return;
                         }
                         console.log('the user was created successfully in the database');
                         response.json({status: 'ok'});
                    });
               });
     } else if (credentials._id === res._id) {
          console.log('the requested username [' + credentials._id + '] already exists');
          console.log('***** CONFIRM THAT WE ARE RETURNING TEH CORRECT ERROR CODES*****');
          response.status(409);
          response.json({
               "status": "fail",
               "message": "username already taken"
          });
          return;
     } else {
          console.log('there is some other error. need to return some kind of error code');
     }
});
});


app.listen(8000, function(){
  console.log('listening on port 8000');
});
