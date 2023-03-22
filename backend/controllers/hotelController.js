const Hotel = require('../model/hotel')

const City = require('../model/city')


const createHotel = async (req, res) => {

    const { name, type, city, address } = req.body

    if ( !name || !type || !city || !address ) {
        res.status(400).json({ message: "Please fill out all the data"})
    }

    try {
        // Check if city exists
        const existingCity = await City.findOne({ name: city });
        if (!existingCity) {
          return res.status(404).json({ message: 'City not found' });
        }
    
        // Check if hotel already exists
        const existingHotel = await Hotel.findOne({ name });
        if (existingHotel) {
          return res.status(400).json({ message: 'Hotel already exists' });
        }
    
        // Create new hotel
        const newHotel = new Hotel({ name, type, address, city });
        await newHotel.save();
    
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
    
module.exports = { createHotel, updateHotel, deleteHotel, getHotel, getHotels, getHotelsByLocation };