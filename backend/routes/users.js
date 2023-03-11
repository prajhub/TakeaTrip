
const { deleteUser, getUser, getUsers, updateUser, getUserProfile} = require('../controllers/userController');

const verify = require('../middleware/verifyJWT')
const protect = require('../middleware/authMiddleware')
const express = require('express');
const verifyAdmin = require('../middleware/verifyAdmin');

const router = express.Router();

function requireAuth(req, res) {
    try {
        console.log(req.user)
        res.sendStatus(200)

    } catch (error) {
        return res.sendStatus(400)
    }
    
}

router.get("/check-auth",  requireAuth)

//UPDATE
router.put("/update/:id",  updateUser)


//DELETE
router.delete("/:id",  deleteUser)

//GET
router.get("/:id",   getUser)


//GETALL
router.get("/", verifyAdmin,  getUsers)

//User Profile
// router.get("/profile", verify,  getUserProfile)


module.exports = router;