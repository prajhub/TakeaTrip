const bcrypt = require('bcrypt');
const User = require('../model/user')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { comparePassword } = require('../utils/helpers')

const handleLogin = async (req, res) => {

    try {
        const user = await  User.findOne({email: req.body.email})
        if(!user) return res.status(400).json({
            msg: 'No user found!'
        })

        const isPasswordCorrect = await comparePassword(req.body.password, user.password)
        if(!isPasswordCorrect) return res.status(400).send({ msg: 'Incorrectt Password laude!'});

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.ACCESS_TOKEN_SECRET);
        
       const { password, isAdmin, ...otherDetails} = user._doc;

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({ details: {...otherDetails}, isAdmin})
    
    } catch (error) {
        res.send(error)
    }



 

        
        // create JWTs

     



        // const accessToken = jwt.sign(
        //     { id: userDB._id, isAdmin: userDB.isAdmin },
        //     process.env.ACCESS_TOKEN_SECRET,
        //     { expiresIn: '15m' }
        // );
        // const refreshToken = jwt.sign(
        //     { id: userDB._id, isAdmin: userDB.isAdmin},
        //     process.env.REFRESH_TOKEN_SECRET,
        //     { expiresIn: '1d' }
        // );
        // // Saving refreshToken with current user`
        // userDB.accesToken = accessToken;
        // userDB.refreshToken = refreshToken;
        // const result = await userDB.save();
        // console.log(result)


       
}

module.exports = { handleLogin };