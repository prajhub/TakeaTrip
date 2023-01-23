const express = require('express');
const router = express.Router()
const passport = require('passport')
const User = require('../model/user')
const { hashPassword} = require('../utils/helpers')


router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log('Logged In')
    res.sendStatus(200)
})



router.post('/register', async(req, res) => {

    const { firstName, lastName, password, email} = req.body
    
    try {
        const userDB = await User.findOne({email});
        if (userDB) {
            res.status(400).send({ msg: 'User already exists!'})
        }else {
            const password = hashPassword(req.body.password)
            console.log(password)
            const newUser = await User.create({ firstName, lastName, password, email})
            newUser.save()
        }
    } catch (error) {
        console.log(error)
    }
    
})

module.exports = router 