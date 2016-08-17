var mongoose = require('mongoose');

/* database setup */

var Provider = mongoose.model('Provider', {
     _id:                   { type: String, required: true},
     encryptedPassword:     { type: String, required: true},
     email:                 { type: String, required: true},

     name:          {type: String, required: true},
     address:       {type: String, required: true},
     address2:      {type: String},
     city:          {type: String, required: true},
     state:         {type: String, required: true},
     zipCode:       {type: String, required: true},

authenticationTokens:
[
     {
          token:    {type: String, required: true},
          expires:  {type: String, required: true}
     }
],

});

module.exports = Provider;
