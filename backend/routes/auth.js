const express = require('express');
const router = express.Router()
const { getUser } = require('../controllers/authController')
const User = require('../model/user')

router.post('/register', async(req, res) => {

    const { username, password, email} = req.body
    const userDB = await User.findOne({ $or: [{ username}, { email }]});
    if (userDB) {
        res.status(400).send({ msg: 'User already exists!'})
    }else {
        const newUser = await User.create({ username, password, email})
        newUser.save()
    }
})

module.exports = router 