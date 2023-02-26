
const { deleteUser, getUser, getUsers, updateUser} = require('../controllers/userController');

const reqAuth = require('../middleware/reqAuth')

const express = require('express');

const router = express.Router();

function requireAuth(req, res) {
    try {
        console.log(req.user)
        res.sendStatus(200)

    } catch (error) {
        return res.sendStatus(400)
    }
    
}

router.get("/check-auth", reqAuth, requireAuth)

//UPDATE
router.put("/update/:id",  updateUser)


//DELETE
router.delete("/:id",  deleteUser)

//GET
router.get("/:id",   getUser)


//GETALL
router.get("/",  getUsers)


module.exports = router;