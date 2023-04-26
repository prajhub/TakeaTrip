const express = require('express');

const router = express.Router();

const { createRoom, updateRoom, deleteRoom, getRoom, getRooms } = require('../controllers/roomController')

//CREATE
router.post("/:accoId",  createRoom);


//UPDATE
router.put("/:id",  updateRoom )


//DELETE
router.delete("/:id/:hotelId",  deleteRoom )

//GET
router.get("/:id",  getRoom )


//GETALL
router.get("/",  getRooms )


module.exports = router;