const mongoose = require("mongoose");

const AccommodationSchema = new mongoose.Schema({
  accommodation: {
    type: Boolean,
    default: true,
  },
  contact: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  zipcode: {
    type: String,
  },

  country: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },

  photos: [String],

  desc: {
    type: String,
  },
  numofRooms: {
    type: String,
  },
  checkinTime: [String],
  checkoutTime: {
    type: String,
  },
  frontDesk: {
    type: Boolean,
  },
  spa: {
    type: Boolean,
  },
  breakfast: {
    type: Boolean,
  },
  pets: {
    type: Boolean,
  },
  outdoor: {
    type: Boolean,
  },
  amenities: {
    type: [String],
  },
  selfCheckIn: {
    type: Boolean,
  },

  rating: {
    type: Number,

    min: 0,
    max: 10,
  },
  cheapestPrice: {
    type: Number,
  },
  rooms: {
    type: [String],
  },

  featured: {
    type: Boolean,
    default: false,
  },

  owner: {
    type: String,
  },
  website: {
    type: String,
  },
});

module.exports = mongoose.model("accommodation", AccommodationSchema);
