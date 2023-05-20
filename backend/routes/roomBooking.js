const express = require("express");

const router = express.Router();

const {
  bookRoom,
  getRoomBookings,
  getPaymentHistory,
} = require("../controllers/roomBookingController");

const verifyJWT = require("../middleware/verifyJWT");

router.post("/", bookRoom);

router.get("/history/:id", getPaymentHistory);

router.get("/bookings/:id", getRoomBookings);

module.exports = router;
