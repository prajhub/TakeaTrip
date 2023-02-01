const jwt = require('jsonwebtoken');
require('dotenv').config();


const verifyJWT = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401)

    const token = authHeader.split('')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, user) => {
            if (err) return res.sendStatus(403).json("Token is not valid!")
            req.user = user;
            next();
        }
    )    
}


module.exports = verifyJWT