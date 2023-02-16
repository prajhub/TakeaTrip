const express = require('express');
const { createHotel, deleteHotel, updateHotel, getHotel, getHotels } = require('../controllers/hotelController');
const Hotel = require('../model/hotel');


const router = express.Router();


//CREATE
router.post("/",  createHotel);


//UPDATE
router.put("/:id",  updateHotel)


//DELETE
router.delete("/:id",  deleteHotel)

//GET
router.get("/:id",  getHotel)


//GETALL
router.get("/",  getHotels)
router.get("/countByCity",  getHotels)
router.get("/countByType",  getHotels)



module.exports = router;