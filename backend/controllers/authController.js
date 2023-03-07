const bcrypt = require('bcrypt');
const User = require('../model/user')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { comparePassword } = require('../utils/helpers')

const asynchHandler = require('express-async-handler');


//@desc Login
//@route POST /auth
//@access Public
const login = asynchHandler( async (req, res) => {

    const { email, password } = req.body
    try {
        if(!email || !password) {
            return res.status(400).json({ message: 'All fields are required'})
        }
    
        const sameUser = await User.findOne({ email }).exec()
    
        if(!sameUser){
            return res.status(401).json({ message: 'Unauthorized' })
        }
    
        const check = comparePassword(password, sameUser.password)
    
        if(!check) return res.status(401).json({ message: 'Unauthorized'}) 
    
        //Generate the accessToken
        const accessToken = jwt.sign(
            {

                
                    "userId": sameUser._id, 
                    "roles": sameUser.roles
            
            },
            process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' }
            
            )

            //Generate the refresh token
            const refreshToken = jwt.sign(
                {
                    "userId": sameUser._id
                },
                process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' }
                
                )
    
                
                //Create a secure cookie with refresh token  //in future: When react sends the request to the refresh endpoint, this cookie is sent along
                res.cookie("jwt", refreshToken,  {
                    
                    httpOnly: true,
                    
                    sameSite: 'None',
                    maxAge: 7 * 24 * 60 * 60 * 1000 
                })
            


            //Send ok status 
            res.json({ accessToken })


            
    } catch (error) {
        return res.sendStatus(400).json(error)
    }
})


//@desc Refresh
//@route POST /auth/refresh
//@access Public - becuz token gets expired
const refresh = asynchHandler( async(req, res) => {

    const coookies = req.cookies

    if(!coookies?.jwt) return res.status(401).json({ message: 'Access denied...No token provided...'})

    const refreshToken = coookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asynchHandler(async (err, decoded) => {
            if(err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.findOne({ _id: decoded.userId })

            if(!foundUser) return res.status(401).json({ message: 'Unauthorizedss' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": foundUser.email,
                        "id": foundUser._id
                    }

                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            )

            res.json({ accessToken })

        })
    )



})



//@desc Loout
//@route POST /auth/logout
//@access Public - to clear cookies if exists
const logout = asynchHandler( async (req, res) => {

    const cookies = req.cookies

    if(!cookies?.auth) return res.sendStatus(204) //nothing

    // res.clearCookie('Authorization', { httpOnly: true, sameSite: 'None', secure: true })
    res.clearCookie('auth', { httpOnly: true, sameSite: 'None', secure: true})
    res.json({ message: 'Cookie Cleared' })

})

module.exports = { login, logout, refresh };