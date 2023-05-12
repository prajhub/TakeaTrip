const Accommodation = require("../model/accommodation");
const Country = require("../model/country");
const User = require("../model/user");
const Rooms = require("../model/room");
const City = require("../model/city");
const cloudinary = require("../utils/cloudinary");

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
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
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
  const { location } = req.query;
  try {
    const accommodations = await Accommodation.find({
      $or: [{ city: location }, { country: location }],
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

module.exports = {
  createAccommodation,
  getAccommodationRooms,
  updateHotel,
  deleteHotel,
  getAllAccommodation,
  getAccommodation,
  getAccommodations,
  getHotelsByLocation,
};
