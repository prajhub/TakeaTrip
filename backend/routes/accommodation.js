const express = require('express');
const { createAccommodation, deleteHotel, updateHotel, getHotel, getHotels, getHotelsByLocation } = require('../controllers/accommodationController');
const verifyJWT = require('../middleware/verifyJWT')

const router = express.Router();


//CREATE
router.post("/", verifyJWT, createAccommodation);


//UPDATE
router.put("/:id",  updateHotel)


//DELETE
router.delete("/:id",  deleteHotel)

//GET
router.get("/:id",  getHotel)


//Just GETALL
router.get("/",  getHotels)
router.get("/countByCity",  getHotels)
router.get("/countByType",  getHotels)

//Get hotels by the Location
router.get("/location/:locationId", getHotelsByLocation )



module.exports = router;