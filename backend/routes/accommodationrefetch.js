const express = require("express");

const { getAccommodationRefetch} = require('../controllers/accommodationRefetch')

const router = express.Router();

router.get("/", getAccommodationRefetch);

module.exports = router;