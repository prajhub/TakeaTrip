const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../model/user')

const protect = asyncHandler(async (req, res, next) => {

    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //Get token from header

            token = req.headers.authorization.split(' ')[1]

            //verify token
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

            //Get user from token as the user id in payload
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized cuz ya aint got no token cuh')
    }
})

module.exports ={protect}