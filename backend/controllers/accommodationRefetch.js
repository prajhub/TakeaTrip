const Accommodation = require("../model/accommodation");
const FoodService = require("../model/foodservice");
const User = require("../model/user");
const Rooms = require("../model/room");
const Service = require("../model/Service");

const getAccommodationRefetch = async (req, res, next) => {
    let { location, min, max } = req.query;
  
    console.log(min, max, location);
  
    location = location.toLowerCase();
  
    const query = {
      $or: [
        { city: { $regex: location, $options: "i" } },
        { country: { $regex: location, $options: "i" } },
      ],
    };
  
    if (min !== undefined && max !== undefined) {
      query.cheapestPrice = { $gte: parseInt(min), $lte: parseInt(max) };
    }
  
    try {
      const accommodations = await Accommodation.find(query);
  
      if (!accommodations.length) {
        return res.status(404).json("No accommodations found");
      }
  
      res.status(200).json(accommodations);
    } catch (error) {
      next(error);
    }
  };

  module.exports = {getAccommodationRefetch}