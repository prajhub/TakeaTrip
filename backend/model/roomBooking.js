const mongoose = require('mongoose');

const roomBookingSchema = new mongoose.Schema({
  userid: {
    type: String,
  },
  room: {
   type: String,
  },
  roomnumber:{
    type: String,
  },
  roomid:{
    type: String,
  },
  fromdate:{
    type: String
  },
  todate: {
    type: String,
  },
  totalamount: {
    type: Number,
  }
  ,
  transactionId: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('roomBookings', roomBookingSchema);
