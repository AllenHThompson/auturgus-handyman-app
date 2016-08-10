var express = require('express');
var app = express();
var Requester = require('./requester');
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

var myNewRequester;

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
                    myNewRequester = new Requester({
                         _id: credentials._id, encryptedPassword: hash,
                         email: credentials.email
                    });
                    myNewRequester.save(function(err) {
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

app.post('/login', function(request, response) {
     /* local variables */
     var uid = '';       /*   used by rand-token */
     var token = '';     /*   used by rand-token */

     /* step 1: fetch the user's record from the database */
     var credentials = request.body;
     // response.send('ok');

     Requester.findOne({_id: credentials._id }, function(error, findResponse){
          if(error){
               console.log('an error occured while reading data for user [' + credentials._id + '] from the database]');
               console.error(error.message);
               return;
          }

          /* OK - we read the user.  Does the password match? use the bcrypt compare() method */
          console.log('checking data for user [' + credentials._id + ']');
          console.log(findResponse.encryptedPassword);
          console.log(credentials.password);
          bcrypt.compare(credentials.password, findResponse.encryptedPassword, function(err, res) {
               if (err) {
                    console.log('an error occured comparing passwords');
                    console.error(err.message);
                    return;
               }
               if(!res) {
                    /* password was incorrect */
                    console.log('password was incorrect');
                    /*
                    need to send failure response with status code 409
                    {
                    "status" : "fail",
                    "message" : "invalid user name or password"
               }
               */
               console.log('***** CONFIRM THAT WE ARE RETURNING THE CORRECT ERROR CODES *****');
               response.status(401);
               response.json({
                    "status": "fail",
                    "message": "invalid user name or password"
               });
               return;
          } else {
               /* password must have been correct */
               console.log('password was correct');

               /* need to generate a token */
               uid = require('rand-token').uid;         /*   used by rand-token */
               token = uid(64);                         /*   used by rand-token */

               /* store the token in the user's authenticationTokens array in the database */

               /* how to get ten days from now? */

               var expirationDate = new Date();
               expirationDate.setDate(expirationDate.getDate() + 10);

               Requester.findByIdAndUpdate(
                    credentials._id,
                    { $push:
                         {
                              authenticationTokens:
                              {
                                   "token" : token,
                                   "expires" : expirationDate
                              }
                         }
                    },
                    function(err, reply) {
                         if (err) {
                              console.error(err.message);
                              return;
                         }
                         console.log('Updated succeeded', reply);
                    }
               );
               /* and easier way would have been to */

               response.status(200);
               response.json({
                    "status": "ok",
                    "token": token
               });
          }
     });
});

});

app.listen(8000, function(){
     console.log('listening on port 8000');
});
