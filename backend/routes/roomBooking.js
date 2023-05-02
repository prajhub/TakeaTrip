const express = require('express');

const router = express.Router();

const {bookRoom} = require('../controllers/roomBookingController')

const verifyJWT = require('../middleware/verifyJWT')

router.post("/",  bookRoom)

module.exports = router;