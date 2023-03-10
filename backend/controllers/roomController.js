const Room = require('../model/room');
const Hotel = require('../model/hotel')

const createRoom = async (req, res, next) => {

    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body)

    try {
        
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$push : {rooms: savedRoom.id}})
        } catch (error) {
            res.status(400).json(error)
        }

        res.status(200).json(savedRoom)


    } catch (error) {
        res.status(400).json(error)
    }

    
}

const updateRoom = async (req, res) => {

    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true}) //returning newest version of doc after updating.
        res.status(200).json(updatedRoom)
    } catch (error) {

        res.status(500).json(error)
        console.log(error)
        
    }
}

const deleteRoom = async (req, res) => {

    const hotelId = req.params.hotelId;

    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$pull : {rooms: req.params.id}})
        } catch (error) {
            res.status(400).json(error)
        }
        res.status(200).json("Room has been deleted.")
    } catch (error) {

        res.status(500).json(error)
        console.log(error)
        
    }
}

const getRoom = async (req, res) => {

    try {
        const room = await Room.find(req.params.id)
        res.status(200).json(room)
    } catch (error) {

        res.status(500).json(error)
        console.log(error)
        
    }
}

const getRooms = async (req, res) => {

    try {
        const rooms = await Hotel.find()
        res.status(200).json(rooms)
    } catch (error) {

        res.status(500).json(error)
        
    }
}

module.exports = { createRoom, updateRoom, deleteRoom, getRoom, getRooms };