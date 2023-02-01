
const { deleteUser, getUser, getUsers, updateUser } = require('../controllers/userController');

const express = require('express');

const verifyToken = require('../middleware/verifyJWT');
const router = express.Router();


router.get('/checkauthentication', verifyToken, (req, res, next) => {
    res.send("Hello user you are logged in!")
})



//UPDATE
router.put("/:id", updateUser)


//DELETE
router.delete("/:id", deleteUser)

//GET
router.get("/:id", getUser)


//GETALL
router.get("/", getUsers)


module.exports = router;