const jwt = require('jsonwebtoken')
const User = require('../model/user')

async function requireAuth(req, res, next) {
  
        //Read the token off the cokie
        const token = req.cookies.Authorization;

        if (!token)
        return res.status(401).send("Access denied...No token provided...");
    
        try {

            //then decode the token
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

            //Check expiuratio
            if(Date.now() > decoded.exp) return res.sendStatus(401)
            
            //find the user with the decoded su
            const user = await User.findById(decoded.sub)
            if(!user) return res.sendStatus(401)


            //attach user to req
            req.user = user
            next();

        } catch (error) {

            return res.sendStatus(400).json(error.message)
            
        }
        

        
    

        

       
        
   
   
    
    
}

module.exports = requireAuth