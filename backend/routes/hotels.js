const express = require('express');
const { createHotel, deleteHotel, updateHotel, getHotel, getHotels } = require('../controllers/hotelController');
const Hotel = require('../model/hotel');
const { createError } = require('../utils/error');
const { verifyUser } = require('../utils/verifyToken');
const router = express.Router();


//CREATE
router.post("/", verifyUser, createHotel);


//UPDATE
router.put("/:id", verifyUser, updateHotel)


//DELETE
router.delete("/:id", verifyUser, deleteHotel)

//GET
router.get("/:id",  getHotel)


//GETALL
router.get("/",  getHotels)
router.get("/countByCity",  getHotels)
router.get("/countByType",  getHotels)



module.exports = router;