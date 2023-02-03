const express = require('express');
const { verifyUser } = require('../utils/verifyToken')
const router = express.Router();

const { createRoom, updateRoom, deleteRoom, getRoom, getRooms } = require('../controllers/roomController')

//CREATE
router.post("/:hotelId", verifyUser, createRoom);


//UPDATE
router.put("/:id", verifyUser, updateRoom )


//DELETE
router.delete("/:id/:hotelId", verifyUser, deleteRoom )

//GET
router.get("/:id", verifyUser, getRoom )


//GETALL
router.get("/", verifyUser, getRooms )


module.exports = router;