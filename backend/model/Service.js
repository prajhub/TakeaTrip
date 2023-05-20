const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  service: {
    type: Boolean,
    default: true,
  },

  city: {
    type: String,
  },
  address: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  serviceType: {
    type: String,
  },
  serviceOption: {
    type: String,
  },
  activityOption: {
    type: String,
  },
  phoneNum: {
    type: String,
  },
  description: {
    type: String,
  },
  name: {
    type: String,
  },
  website: {
    type: String,
  },
  owner: {
    type: String,
  },

  photos: [String],
  duration: {
    type: String,
  },
  packages: [
    {
      packageName: {
        type: String,
      },
      startTime: {
        type: [],
      },
      price: {
        type: Number,
      },
      date: {
        type: String,
      },
      numPeopleIncluded: {
        type: String,
      },
      bookedby: {
        type: String,
      },
    },
  ],
  country: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Service", serviceSchema);
