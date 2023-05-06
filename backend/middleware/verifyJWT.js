const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = decoded;
    console.log(req.user);
    next();
  });
};

//  const verifyAdmin = (req, res, next) => {
//   verifyJWT(req, res, next, () => {
//     if(req.user.roles === 'Admin') {
//       next()
//     } else {
//       res.status(401).json({ message: 'User is not admin'})
//     }
//   })
// }

module.exports = verifyJWT;
