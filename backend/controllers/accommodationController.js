const Accommodation = require('../model/accommodation')
const Country = require('../model/country')
const City = require('../model/city')
const cloudinary = require('../utils/cloudinary')
const axios = require('axios');


const createAccommodation = async (req, res) => {

    const username = process.env.ROADGOAT_API_KEY;
    const password = process.env.ROADGOAT_SECRET_KEY;

    const auth = Buffer.from(`${username}:${password}`).toString('base64')

    const headers = {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
    };



    const { name, type, city, address, country, img } = req.body
  

    if ( !name || !type || !city || !address || !country ) {
        res.status(400).json({ message: "Please fill out all the data"})
    }

    try {
        const existingCountry = await Country.findOne({ name: country });
        if (!existingCountry) {
            // const response = await axios.get(`https://api.roadgoat.com/api/v2/destinations/auto_complete?q=${country}`, { headers })
            // const countryData = response.data.data[0]
            
            // const newCountry = new Country({ name: countryData.attributes.short_name})
            // console.log(newCountry)
        }
        
        // Check if city exists
        const existingCity = await City.findOne({ name: city });
        if (!existingCity) {
          return res.status(404).json({ message: 'City not found' });
        }

        
        
        // Check if hotel already exists
        const existingAccommodation = await Accommodation.findOne({ name });
        if (existingAccommodation) {
          return res.status(400).json({ message: 'Hotel already exists' });
        }

        //uploading image to cloudniary
        const result = await cloudinary.uploader.upload(img, {
            folder: "property"
        })

        
    
        // Create new hotel
        const newAccommodation = new Hotel({ name, type, address, city, photos: {
            public_id: result.public_id,
            url: result.secure_url
        } });
        await newAccommodation.save();
    
        // Add hotel to city's hotel array
        existingCity.hotels.push(newHotel);
        await existingCity.save();
    
        res.status(201).json(newHotel);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }

}

const updateHotel = async (req, res) => {

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true})
        res.status(200).json(updatedHotel)
    } catch (error) {

        res.status(500).json(error)
        console.log(error)
        
    }
}

const deleteHotel = async (req, res) => {

    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted.")
    } catch (error) {

        res.status(500).json(error)
        console.log(error)
        
    }
}

const getHotel = async (req, res) => {

    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (error) {

        res.status(500).json(error)
        console.log(error)
        
    }
}

const getHotels = async (req, res) => {

    try {
        const hotels = await Hotel.find()
        res.status(200).json(hotels)
    } catch (error) {

        next(error)
        
    }
}


const getHotelsByLocation = async (req, res) => {

    const { locationId } = req.params;

    if(!locationId){
        return res.sendStatus(401).json({ message: 'Enter the location name cuh!'})
    }

    try {
        const foundLocation = await Location.findById(locationId).populate('hotels').lean()

        if(!foundLocation){
            res.status(401).json({ message: 'Location not found'})
        }


        const hotels = foundLocation.hotels
        res.status(200).json(hotels)
        
    } catch (error) {
        res.status(401).json(error)
    }
}
    
module.exports = { createAccommodation, updateHotel, deleteHotel, getHotel, getHotels, getHotelsByLocation };