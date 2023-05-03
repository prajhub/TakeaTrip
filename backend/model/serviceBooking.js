const mongoose = require("mongoose");

const serviceBookingSchema = new mongoose.Schema({
  userid: {
    type: String,
  },
  name: {
    type: String,
  },
  serviceid: {
    type: String,
  },
  starttime: {
    type: String,
  },
  packageid: {
    type: String,
  },
  date: {
    type: String,
  },
  totalamount: {
    type: Number,
  },
  transactionid: {
    type: String,
  },
  packagename: {
    type: String,
  },
  numofpeople: {
    type: String,
  },
});

module.exports = mongoose.model("serviceBookings", serviceBookingSchema);
