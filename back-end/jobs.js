/* database setup */

var Job = mongoose.model('Jobs', {
     status : {type: Boolean, required: true},
     rate: {type: Number, required: true},
     description: {type: String},
     providerId: {type: ObjectId, },
     providerName: {type: String},
     requesterId: {type: ObjectId, required: true},
     requesterName: {type: String, required: true}
});

module.exports = Jobs;
