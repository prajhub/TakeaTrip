const express = require("express");

const router = express.Router();

const {
  bookService,
  getServiceBooking,
} = require("../controllers/serviceBookingController");

router.post("/", bookService);

router.get("/:id", getServiceBooking);

module.exports = router;
