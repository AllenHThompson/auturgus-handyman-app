var mongoose = require('mongoose');

/* database setup */

var jobs = mongoose.model('jobs', {
     providerId:    { type: String},
     requesterId:   { type: String},
     timeStamp:     { type: Date},

	requesterId: {type: String}, //added this Tuesday to link order to requester

	wall:{ type: String },
	brackets:{ type: Boolean },
	gt32:{ type: Boolean },
	numHoles:{ type: Number },
	sizeHole:{ type: String },
	typeWall:{ type: String },
	numFans:{ type: Number },
	installType:{ type: String },
	haveFan:{ type: Boolean },
	needLadder:{ type: Boolean },
	numHours:{ type: Number },
     total:{ type: Number },
	description:{ type: String },

     isComplete: {type: Boolean}


});

module.exports = jobs;
