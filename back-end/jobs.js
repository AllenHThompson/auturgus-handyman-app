/* database setup */

var Jobs = mongoose.model('Jobs', {
     status: {type: Boolean, required: true},
     orders: [{
          wall: {type: String},
          brackets: {type: String},
          gt32: {type: String},
          numHoles: {type: String},
          sizeHole: {type: String},
          typeWall: {type: String},
          numFans: {type: String},
          installType: {type: String},
          haveFan: {type: String},
          needLadder: {type: String},
          numHours: {type: Number},
          date: {type: String},
          time: {type: String},
          total: {type: String, required: true},
          description: {type: String}
     }],
     total: {type: Number, required: true},
     description: {type: String},
     providerId: {type: ObjectId},
     providerName: {type: String},
     requesterId: {type: ObjectId, required: true},
     requesterName: {type: String, required: true}
});

module.exports = Jobs;
