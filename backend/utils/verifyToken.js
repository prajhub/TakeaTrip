const jwt = require('jsonwebtoken')


const verifyToken = async (req, res) => {

    const token = req.cookies.access_token;
    if(!token){
        res.status(401).send({ msg: "You are not authenticated!"})
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(401).send({ msg: "Token not valid."});

        req.user = user;
        next();
    })
}




module.exports = { verifyToken }