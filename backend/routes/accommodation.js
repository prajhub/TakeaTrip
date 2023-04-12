const express = require('express');
const { createAccommodation, deleteHotel, updateHotel, getAccommodation, getAccommodations, getHotelsByLocation } = require('../controllers/accommodationController');
const verifyJWT = require('../middleware/verifyJWT')

const router = express.Router();


//CREATE
router.post("/", verifyJWT, createAccommodation);


//UPDATE
router.put("/:id",  updateHotel)


//DELETE
router.delete("/:id",  deleteHotel)

//GET
router.get("/:id",  getAccommodation)


//Just GETALL
router.get("/",  getAccommodations)

router.get("/countByCity",  getAccommodations)
router.get("/countByType",  getAccommodations)

//Get hotels by the Location
router.get("/location/:locationId", getHotelsByLocation )



module.exports = router;