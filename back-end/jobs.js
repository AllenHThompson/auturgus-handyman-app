var mongoose = require('mongoose');

/* database setup */

var jobs = mongoose.model('jobs', {
     _id:           { type: String, required: true},


     providerId:    { type: String},
     requesterId:   { type: String},
     timeStamp:     { type: Date},
     
     orders:
     [
          {
               orderID:       {type: String},
               isComplete:    {type: String}
          }
     ]


});

module.exports = jobs;
