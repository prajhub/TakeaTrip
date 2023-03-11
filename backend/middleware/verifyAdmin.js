const jwt = require('jsonwebtoken');

const verifyAdmin =  (req, res, next) => {


    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const token = authHeader.split(' ')[1];
  
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
            console.log(err)
          return res.status(403).json({ message: 'Forbidden' });
        }
        console.log(decoded)
        if(decoded.roles === 'Admin'){
            req.user = decoded;
            next();  
        }else {
            res.status(400).json({ message: 'You aint no admin cuh'})
        }
        
      }
    );


}



module.exports = verifyAdmin