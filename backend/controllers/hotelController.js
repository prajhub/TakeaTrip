const Hotel = require('../model/hotel')
const Location = require('../model/location')

const createHotel = async (req, res) => {

    const { name, type, city, address, title, desc } = req.body

    if (!name || !type || !city || !address || !title || !desc) {
        return res.status(400).json({ message: "All field required"})
    }

    try {
        
        // Check if the location exists
        const location = await Location.findOne({ name: city });
        if (!location) {
        return res.status(404).json({ message: 'Location not found' });
        }

        // Check if the hotel already exists
        const existingHotel = await Hotel.findOne({ name });
        if (existingHotel) {
        return res.status(409).json({ message: 'Hotel already exists' });
        }

       

        const newHotel = new Hotel({ name, desc, title, address, type,  city: location.name });
        await newHotel.save();
    
        // Add the hotel to the location
        location.hotels.push(newHotel);
        await location.save();
    
        res.status(201).json(newHotel);


    } catch (error) {
        res.status(500).json(error)
    }

    // const newHotel = new Hotel(req.body)

    // try {
    //     const savedHotel = await newHotel.save()
    //     res.status(200).json(savedHotel)
    // } catch (error) {

    //     res.status(500).json(error)
    //     console.log(error)
        
    // }
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
        const hotel = await Hotel.find(req.params.id)
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
    
module.exports = { createHotel, updateHotel, deleteHotel, getHotel, getHotels };