const bcrypt = require('bcrypt');
const User = require('../model/user')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { comparePassword } = require('../utils/helpers')

const handleLogin = async (req, res) => {

    const {email, password} = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required.' });

    const userDB = await User.findOne({ email }).exec();
    if(!userDB) throw new Error('User not found');

    const isValid = comparePassword(password, userDB.password);
    if (isValid) {

        
        // create JWTs
        const accessToken = jwt.sign(
            { id: userDB._id, isAdmin: userDB.isAdmin },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            { id: userDB._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        userDB.refreshToken = refreshToken;
        const result = await userDB.save();
        console.log(result)


        res.cookie('jwt', accessToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }

}

module.exports = { handleLogin };