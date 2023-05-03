const express = require("express");

const router = express.Router();

const { bookService } = require("../controllers/serviceBookingController");

router.post("/", bookService);

module.exports = router;
