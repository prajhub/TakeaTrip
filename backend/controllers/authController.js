const bcrypt = require('bcrypt');
const User = require('../model/user')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { comparePassword } = require('../utils/helpers')
const { addRefreshTokenToWhitelist } = require('../utils/authService')
const asynchHandler = require('express-async-handler')


//@desc Login
//@route POST /auth
//@access Public
const login = asynchHandler( async (req, res) => {

    const { email, password } = req.body

    if(!email || !password) {
        return res.status(400).json({ message: 'All fields are required'})
    }

    const sameUser = await User.findOne({ email }).exec()

    if(!sameUser){
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const check = await comparePassword(password, sameUser.password)

    if(!check) return res.status(401).json({ message: 'Unauthorized'}) 


    const accessToken = jwt.sign(
        {

        "UserInfo": {
            
            "id": sameUser._id
        }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10d'}
    )

    const refreshToken = jwt.sign(
        { "id": sameUser._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d'}
    )


    //Create secure cookies with ref token

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    //send accesstoken containing user info
    res.json({ accessToken, refreshToken })
    await addRefreshTokenToWhitelist({ refreshToken, userId: sameUser._id})


})


//@desc Refresh
//@route POST /auth/refresh
//@access Public - becuz token gets expired
const refresh = asynchHandler( async (req, res) => {

    const cookies = req.cookies

    if(!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized'})

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asynchHandler(async (err, decoded) => {
            if(err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.findOne({ email: decoded.email })

            if(!foundUser) return res.status(401).json({ message: 'Unauthorized' })

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

    if(!cookies?.jwt) return res.sendStatus(204) //nothing

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie Cleared' })

})

module.exports = { login, logout, refresh };