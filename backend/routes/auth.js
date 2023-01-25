const express = require('express');
const router = express.Router()
const passport = require('passport')
const User = require('../model/user')
const { hashPassword, comparePassword} = require('../utils/helpers')
const jwt = require('jsonwebtoken');
const user = require('../model/user');
const secretKey = process.env.JWT_SECRET;


//Local strategy
// router.post('/login', passport.authenticate('local'), (req, res) => {
//     console.log('Logged In')
//     res.sendStatus(200)
// })


router.post('/login', async (req, res) => {

    // await User.findOne({ email: req.body.email}).then(user => {
    //     if(!user) {
    //         return res.status(401).send({
    //             success: false,
    //             message: "Could not find the user."
    //         })
    //     }

    //     if(comparePassword(req.body.password, user.password)){
    //         return res.status(401).send({
    //             success: false,
    //             message: "Incorrect password."
    //         })
    //     }

        try {
            const { email, password} = req.body;
            if(!email || !password){
                throw new Error('Missing credentials')
            }
            const userDB = await User.findOne({ email })
            if(!user) throw new Error('User not found');
            const isValid = comparePassword(password, userDB.password)
            if(!isValid){
                return res.status(401).send({
                    success: false,
                    message: "Incorrect password."
                })
            }
            
            const payload = {
                email: userDB.email,
                id: userDB._id
            }
            const token =  jwt.sign(payload, secretKey, { expiresIn: "1d"} )
            return res.status(200).send({
                success: true,
                message: "Logged in successfully.",
                token: "Bearer " + token
            })
        } catch (error) {
            return res.status(400).send(error)
        }

        

       

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
            newUser.save().then(user => {
                res.send({
                    success: true,
                    message: "User created successfully",
                    user: {
                        id: user._id,
                        username: user.username
                    }
                })
            })
        }
    } catch (error) {
        console.log(error)
    }
    
})

module.exports = router 