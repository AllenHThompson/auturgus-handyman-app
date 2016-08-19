# Auturgus: A Handyman App

#### A web application using HTML, CSS, JavaScript, AngularJS on the front-end and Node.js, Express, MongoDB, and Mongoose on the back-end. Stripe was used for payments

## Summary
This app is an Uber for handymen. There are two parties involved; the 'requester' - those looking to have a task completed, the 'provider' - service professionals looking to get paid to complete a task. A requester will choose from a list of very specific jobs/tasks/projects. This app is dependent on jobs with a narrow scope. Bigger jobs with larger scopes will have to be quoted onsite by a provider (service professional). The requester enter details about the project and receive  a quote. The requester will be prompted to pay for their service. The requester can also log in and view all the service they have scheduled. The requester can also logout and all cookies will be deleted. Right now, only the requester side is complete. Future functionality will allow the "jobs" to be sent to a queue were the providers/service professionals can select the jobs.

## Technologies, frameworks, & programming languages used
* HTML5 & CSS3
* Bootstrap
* JavaScript
* jQuery
* MongoDB
  * Mongoose
* AngularJS
* Express
* Node.js


## Demo
[Live Demo](http://auturgus-handyman-app.surge.sh/)

## Screenshots
###Home page:
![alt text](https://github.com/AllenHThompson/auturgus-handyman-app/blob/master/auturgus-home-page.png)
###Login page:
![alt text](https://github.com/AllenHThompson/auturgus-handyman-app/blob/master/auturgus-login-screen.png)
###Register page:
![alt text](https://github.com/AllenHThompson/auturgus-handyman-app/blob/master/auturgus-register-page.png)
###Jobs page:
![alt text](https://github.com/AllenHThompson/auturgus-handyman-app/blob/master/auturgus-jobs-screen.png)

### Prerequisities
#### NPMs to install
```npm modules to install
var express = require('express');
var app = express();
var Requester = require('./requester');
var Jobs = require('./jobs');
var Orders = require('./orders');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var bcrypt = require('my-bcrypt');
var randomtoken = require('rand-token');
var cors = require('cors');
```

## Deployment
Add additional notes about how to deploy this on a live system

```

```

## Versioning
0.1.0
## Authors

* **Allen H. Thompson** - (https://github.com/allenhthompson)

## Acknowledgments
* Need to thank Toby Ho and Will Wyatt for helping me along the way!

##WISH LIST
+ Need to handle the provider side to so they can pick and choose the jobs.
+ Add a 'paid' flag to the jobs table in case a credit card was charged back.
+ Create a more fluid scheduling system so providers and work out their schedule.
+ Allow requester to have bidding for their jobs.
+ 'Pay it now' pricing for job quotes.
+ Display message to user when a user name is already taken.
+ Display a message to the user when a password doesn't match.
+ Have to have a rating for requesters and providers.
