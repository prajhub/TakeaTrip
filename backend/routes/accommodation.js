const express = require("express");
const {
  createAccommodation,
  deleteHotel,
  updateHotel,
  getAllAccommodation,
  getAccommodation,
  getAccommodationRooms,

  getAccommodations,
  getPropertyById,
  getHotelsByLocation,
} = require("../controllers/accommodationController");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

//CREATE
router.post("/", verifyJWT, createAccommodation);

//UPDATE
router.put("/:id", updateHotel);

//UPDATE CHEAPEST PRICE

//DELETE
router.delete("/:id", deleteHotel);

//GET
router.get("/:id", getAccommodation);



//Just GETALL
router.get("/", getAccommodations);

router.get("/all/accommodation", getAllAccommodation);

router.get("/countByCity", getAccommodations);

router.get("/countByType", getAccommodations);

//Get Rooms by accomodation
router.get("/accomodationrooms/:id", getAccommodationRooms);

//Get hotels by the Location
router.get("/location/:locationId", getHotelsByLocation);

router.get("/property/:id", getPropertyById);

module.exports = router;
