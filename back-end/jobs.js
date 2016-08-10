/* database setup */

var Requester = mongoose.model('Jobs', {
  _id:                   { type: String, required: true},
  email:                 { type: String, required: true},

  bookings:
  [
    {
      "options":  {
        "grind" :   {type: String, required: true},
        "quantity": {type: Number, required: true}
      },

      "address":  {
        "name":          {type: String, required: true},
        "address":       {type: String, required: true},
        "address2":      {type: String},
        "city":          {type: String, required: true},
        "state":         {type: String, required: true},
        "zipCode":       {type: String, required: true},
        "deliveryDate":  {type: Date, required: true}
      },
      "total": {type: Number, required: true}
    }
  ]
});

module.exports = Jobs;
