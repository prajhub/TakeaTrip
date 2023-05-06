const {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  getUserProfile,
} = require("../controllers/userController");

const verify = require("../middleware/verifyJWT");
const protect = require("../middleware/authMiddleware");
const express = require("express");
const verifyAdmin = require("../middleware/verifyAdmin");
const User = require("../model/user");
const router = express.Router();
const Token = require("../model/token");

//UPDATE
router.put("/update/:id", updateUser);

//DELETE
router.delete("/:id", deleteUser);

//GET
router.get("/profile", verify, getUser);

router.get("/:id/verify/:token", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).send({ message: "Invalid link: user not found" });
    }

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) {
      return res.status(400).send({ message: "Invalid link: token not found" });
    }

    await User.updateOne({ _id: user._id }, { $set: { isVerified: true } });
    await token.remove();

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error verifying email" });
  }
});

//GETALL
router.get("/", getUsers);

//User Profile
// router.get("/profile", verify,  getUserProfile)

module.exports = router;
