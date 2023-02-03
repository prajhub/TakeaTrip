const jwt = require('jsonwebtoken')


const verifyToken = async (req, res, next) => {

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

const verifyUser = async (req, res, next) => {


    verifyToken(req, res, next, ()=> {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else {
            return res.status(403).send({ msg: "You are not authorized."});
        }
    })
}

const verifyAdmin = async (req, res, next) => {


    verifyToken(req, res, next, ()=> {
        if(req.user.isAdmin){
            next()
        }else {
            return res.status(403).send({ msg: "You are not authorized."});
        }
    })
}



module.exports = { verifyToken, verifyUser, verifyAdmin }