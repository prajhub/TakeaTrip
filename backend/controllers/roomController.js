const Room = require('../model/room');
const Accommodation = require('../model/accommodation')


const createRoom = async (req, res, next) => {

    const accoId = req.params.accoId;
    console.log(accoId)

    const {type, roomclass, price, bathroom, roomview, inroomamenities, maxPeople, kitchenamenities, bedding, inroomrefreshments, photos} = req.body
 
   
    if ( !price  ) {
        return res.status(400).json({ message: "Please fill out all the data"})
    }
   
    try {
      const newRoom = new Room({type, roomclass, price, bathroom, roomview, maxPeople, inroomamenities, kitchenamenities, bedding, inroomrefreshments, photos})
      const savedRoom = await newRoom.save()
      try {
        await Accommodation.findByIdAndUpdate(accoId, {
          $push: { rooms: savedRoom._id },
        }).exec();
      } catch (err) {
        next(err);
      }
      res.status(200).json(savedRoom);
    } catch (err) {
      res.status(400).json(err);
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