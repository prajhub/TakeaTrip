const Accommodation = require("../model/accommodation");
const FoodService = require("../model/foodservice");
const User = require("../model/user");
const Rooms = require("../model/room");
const Service = require("../model/Service");

const createAccommodation = async (req, res) => {
  const {
    name,
    type,
    numofRooms,
    city,
    address,
    country,
    desc,
    zipcode,
    photos,
    checkinTime,
    checkoutTime,
    contact,
    frontDesk,
    cheapestPrice,
    amenities,
    website,
  } = req.body;

  const userId = req.user.userId;

  if (!name || !type || !city || !address || !country) {
    return res.status(400).json({ message: "Please fill out all the data" });
  }

  try {
    //Finding the user who is posting the accommodation
    const user = await User.findById(userId);

    // Check if hotel already exists
    const existingAccommodation = await Accommodation.findOne({ name });
    if (existingAccommodation) {
      return res.status(400).json({ message: "Hotel already exists" });
    }

    // Create new hotel
    const newAccommodation = new Accommodation({
      name,
      website,
      amenities,

      numofRooms,
      checkinTime,
      checkoutTime,
      frontDesk,
      type,
      zipcode,
      contact,
      cheapestPrice,
      address,
      desc,
      city,
      country,
      owner: user._id,
      photos,
    });
    await newAccommodation.save();

    // Saving the newly created accommodation in the user's properties array
    user.properties.push(newAccommodation);
    await user.save();

    // Change user's role to Service Provider
    user.roles = "Service Provider";
    await user.save();

    return res.status(201).json(newAccommodation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateHotel = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedHotel = await Accommodation.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const deleteHotel = async (req, res) => {
  try {
    await Accommodation.findByIdAndDelete(req.params.id);
    res.status(200).json("Accommodation has been deleted.");
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const getAccommodation = async (req, res) => {
  try {
    const hotel = await Accommodation.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const getAllAccommodation = async (req, res) => {
  try {
    const hotel = await Accommodation.find();
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const getAccommodations = async (req, res, next) => {
  let { location } = req.query;

  location = location.toLowerCase();

  try {
    const accommodations = await Accommodation.find({
      $or: [
        { city: { $regex: location, $options: "i" } }, // Case-insensitive search for city
        { country: { $regex: location, $options: "i" } }, // Case-insensitive search for country
      ],
    });

    if (!accommodations.length) {
      return res.status(404).json("No accommodations found");
    }

    res.status(200).json(accommodations);
  } catch (error) {
    next(error);
  }
};

const getAccommodationRooms = async (req, res, next) => {
  try {
    const accomodation = await Accommodation.findById(req.params.id);
    const list = await Promise.all(
      accomodation.rooms.map((room) => {
        return Rooms.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

const getHotelsByLocation = async (req, res) => {
  const { locationId } = req.params;

  if (!locationId) {
    return res
      .sendStatus(401)
      .json({ message: "Enter the location name cuh!" });
  }

  try {
    const foundLocation = await Location.findById(locationId)
      .populate("hotels")
      .lean();

    if (!foundLocation) {
      res.status(401).json({ message: "Location not found" });
    }

    const hotels = foundLocation.hotels;
    res.status(200).json(hotels);
  } catch (error) {
    res.status(401).json(error);
  }
};

const getPropertyById = async (req, res) => {
  const { id } = req.params;

  try {
    // Query the Accommodation model
    const accommodation = await Accommodation.findById(id);

    // Query the FoodService model
    const foodService = await FoodService.findById(id);

    // Query the Service model
    const service = await Service.findById(id);

    // Check if any of the models found a property with the given ID
    if (accommodation) {
      return res.json(accommodation);
    } else if (foodService) {
      return res.json(foodService);
    } else if (service) {
      return res.json(service);
    } else {
      return res.status(404).json({ error: "Property not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createAccommodation,
  getAccommodationRooms,
  updateHotel,
  deleteHotel,
  getAllAccommodation,
  getAccommodation,
  getPropertyById,
  getAccommodations,
  getHotelsByLocation,
};
