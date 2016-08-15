var mongoose = require('mongoose');

/* database setup */

var orders = mongoose.model('orders', {

     service: { type: String },
     numFans: { type: String },
     installType: { type: String },
     haveFan: { type: String },
     needLadder: { type: String },
     description: { type: String },
     total: { type: Number }
});

module.exports = orders;
