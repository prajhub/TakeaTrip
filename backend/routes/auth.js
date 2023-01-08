const express = require('express');
const router = express.Router()
const passport = require('passport')
const User = require('../model/user')
const { hashPassword} = require('../utils/helpers')


router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log('Logged In')
    res.send(200)
})



router.post('/register', async(req, res) => {

    const { username, password, email} = req.body
    const userDB = await User.findOne({ $or: [{ username}, { email }]});
    if (userDB) {
        res.status(400).send({ msg: 'User already exists!'})
    }else {
        const password = hashPassword(req.body.password)
        console.log(password)
        const newUser = await User.create({ username, password, email})
        newUser.save()
    }
})

module.exports = router 