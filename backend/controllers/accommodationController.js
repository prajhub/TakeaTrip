const Accommodation = require('../model/accommodation')
const Country = require('../model/country')
const User = require('../model/user')
const City = require('../model/city')
const cloudinary = require('../utils/cloudinary')
const axios = require('axios');
const createLocation =  require('../utils/locationCreator')

const createAccommodation = async (req, res) => {




    const { name, type, city, address, country, img } = req.body

    const userId = req.user.userId;
  

    if ( !name || !type || !city || !address || !country ) {
        return res.status(400).json({ message: "Please fill out all the data"})
    }
    

    try {

        //Finding the user who is posting the accommodation
        const user = await User.findById(userId)


        const existingCountry = await Country.findOne({ name: country });
        if (!existingCountry) {
            return res.status(404).json({ message: 'Country not found'})
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
            folder: "property",
            width: 300,
            crop: 'scale'
        })

        
    
        // Create new hotel
        const newAccommodation = new Accommodation({ name, type, address, city, country,  owner: user._id, photos: {
            public_id: result.public_id,
            url: result.secure_url
        }
         });
        await newAccommodation.save();
    
        // Add hotel to the country / city's  accommodation array 
        existingCity.accommodations.push(newAccommodation._id);
                await existingCity.save();
        existingCountry.accommodations.push(newAccommodation._id);
        await existingCountry.save();
             
         
    
       return res.status(201).json(newAccommodation);
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