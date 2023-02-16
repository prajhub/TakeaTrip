const bcrypt = require('bcrypt');
const User = require('../model/user')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { comparePassword } = require('../utils/helpers')


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d'
    })
}

const handleLogin = async (req, res) => {

    const { email, password } = req.body

    //check for user email
    const user = await User.findOne({email})
   
    if(user && (comparePassword(password, user.password))) {
        res.json({
            _id: user.id,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }


 

        
        

       
}

module.exports = { handleLogin };