
const { deleteUser, getUser, getUsers, updateUser } = require('../controllers/userController');

const express = require('express');
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken');


const router = express.Router();


// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//     res.send("Hello user you are logged in!")
// })

// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//     res.send("Hello user you are logged in and you can delete your account")
// })

// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//     res.send("Hello Admin you are logged in and can delete all acounts.")
// })



//UPDATE
router.put("/:id", verifyUser, updateUser)


//DELETE
router.delete("/:id", verifyUser, deleteUser)

//GET
router.get("/:id", verifyUser, getUser)


//GETALL
router.get("/", verifyAdmin, getUsers)


module.exports = router;