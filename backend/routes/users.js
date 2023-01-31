
const { deleteUser, getUser, getUsers, updateUser } = require('../controllers/userController');

const express = require('express');

const router = express.Router();






//UPDATE
router.put("/:id", updateUser)


//DELETE
router.delete("/:id", deleteUser)

//GET
router.get("/:id", getUser)


//GETALL
router.get("/", getUsers)


module.exports = router;