const mongoose = require('mongoose');

const roomBookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'rooms',
    required: true
  },
  checkinDate: {
    type: Date,
    required: true
  },
  checkoutDate: {
    type: Date,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('roomBookings', roomBookingSchema);
