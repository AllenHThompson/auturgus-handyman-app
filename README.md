# Auturgus: A Handyman App

(delete-One Paragraph of project description goes here)
This app is an Uber for handymen. There are two parties involved; the 'requester' - those looking to have a task completed, the 'provider' - service professionals looking to get paid to complete a task. A requester will choose from a list of very specific jobs/tasks/projects. The requester enter details about the project and receive  a quote. The requester will be prompted to pay for their service. Right now, only the requester side is complete. Future functionality will allow the "jobs" to be sent to a queue were the providers/service professionals can select the jobs.

## Screenshots

![alt tag](https://raw.githubusercontent.com/username/projectname/branch/path/to/img.png)
![alt tag](/Users/mac/github-projects/auturgus-handyman-app/auturgus-home-screen.png)

## Getting Started

(delete-These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.) 'CD' to the 'front-end' directory and service it local. 'CD' to the 'back-end' and from the command line type 'node index.js'. Open a new terminal and run 'mongod' to start the Mongo database.

### Prerequisities

(delete-What things you need to install the software and how to install them)
mongoose
node

```
Give examples
```

### Installing

(delete A step by step series of examples that tell you have to get a development env running)

(delete Stay what the step will be)

```
Give the example
```

And repeat

```
until finished
```

(delete End with an example of getting some data out of the system or using it for a little demo)


## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* JavaScript
* Node.js
* Express

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

## NPMs to install

```node
$ npm install express --save
$ npm install mongoose --save
$ npm install my-bcrypt --save
$ npm install rand-token --save
$ npm install body-parser --save
$ npm install cors --save
$ npm install stripe --save
```

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

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Allen H. Thompson** - (https://github.com/allenhthompson)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
