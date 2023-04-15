
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  streetAddress: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  serviceType: {
    type: String,
    required: true
  },
  serviceOption: {
    type: String,
    required: true
  },
  phoneNum: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  officialName: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  personRange:{
    type: String,
  },
  photos: [{
    public_id: {
        type: String
    },
    url: {
        type: String
    }
    
}],
  duration: {
    type: String,
  },
  packages: [{
    packageName: {
      type: String,
      
    },
    startTime:{
        type: [],
    },
    price: {
      type: Number,
     
    },
    numPeopleIncluded: {
      type: Number,
      
    }
  }],
  country: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Service', serviceSchema);
