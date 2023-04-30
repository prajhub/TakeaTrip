const jwt = require('jsonwebtoken');

const decodeJwt = (token) =>{
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decodedToken.userId; 
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports = { decodeJwt };