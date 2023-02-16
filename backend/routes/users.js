
const { deleteUser, getUser, getUsers, updateUser } = require('../controllers/userController');

const express = require('express');
const {protect} = require('../middleware/authMiddleware')
const router = express.Router();




//UPDATE
router.put("/update/:id",  updateUser)


//DELETE
router.delete("/:id",  deleteUser)

//GET
router.get("/:id", protect,  getUser)


//GETALL
router.get("/",  getUsers)


module.exports = router;