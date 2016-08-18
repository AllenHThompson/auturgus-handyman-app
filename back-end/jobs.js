var mongoose = require('mongoose');

/* database setup */

var jobs = mongoose.model('jobs', {
     providerId:    { type: String},
     requesterId:   { type: String},
     timeStamp:     { type: Date},

	userId: {type: String}, //added this Tuesday to link order to requester
     service:{type: String}, //added this Wednesday to display on myjobs.html
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

     // isPaid: {type: Boolean}
     isComplete: {type: Boolean}


});

module.exports = jobs;
