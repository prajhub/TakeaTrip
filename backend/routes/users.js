const {
  deleteUser,
  getUser,
  getUsers,
  getUserById,
  updateUser,
} = require("../controllers/userController");
const crypto = require("crypto");
const verify = require("../middleware/verifyJWT");
const protect = require("../middleware/authMiddleware");
const express = require("express");
const verifyAdmin = require("../middleware/verifyAdmin");
const User = require("../model/user");
const router = express.Router();
const Token = require("../model/token");
const jwt = require("jsonwebtoken");
const { hashPassword } = require("../utils/helpers");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "triptakea19@gmail.com",
    pass: "qvqvyugzcfysrjol",
  },
});

//UPDATE
router.put("/update/:id", updateUser);

//DELETE
router.delete("/:id", deleteUser);

// router.get("/:id", getUserById);

//GET
router.get("/profile", verify, getUser);

router.get("/user/:id", getUserById);

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

    if (user.isVerified) {
      // User has already been verified, no need to remove token
      return res.status(200).send({ message: "Email already verified" });
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

//send email link for reset pss

router.post("/sendpasswordlink", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(401).json({ status: 401, message: "Enter your email" });
  }

  try {
    const userFind = await User.findOne({ email: email });

    //Generating token for reseting pass

    const token = jwt.sign(
      { _id: userFind._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "120s",
      }
    );

    const setUserToken = await User.findByIdAndUpdate(
      { _id: userFind._id },
      { verifytoken: crypto.randomBytes(32).toString("hex") },
      { new: true }
    );

    if (setUserToken) {
      const mailOption = {
        from: "triptakea19@gmail.com",
        to: email,
        subject: "Sending email",
        text: ` http://localhost:5173/passwordreset/${userFind.id}/user/${setUserToken.verifytoken}`,
      };

      transporter.sendMail(mailOption, (error, info) => {
        if (error) {
          console.log("error", error);
          res.status(401).json({ status: 401, message: "Email not sent" });
        } else {
          console.log("Email sent", info.response);
          res
            .status(201)
            .json({ status: 201, message: "Email sent successfully" });
        }
      });
    }
  } catch (error) {
    res.status(401).json({ status: 401, message: "Invalid user" });
  }
});

// verify user for forgot password time
router.get("/passwordreset/:id/:token", async (req, res) => {
  const { id, token } = req.params;

  try {
    const validuser = await User.findOne({ _id: id, verifytoken: token });

    if (validuser) {
      res.status(201).json({ status: 201, validuser });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

//new password

router.post(`/:id/:token`, async (req, res) => {
  const { id, token } = req.params;

  const { password } = req.body;

  console.log(id, token, password);

  try {
    const validuser = await User.findOne({ _id: id, verifytoken: token });

    if (validuser) {
      const newPassword = hashPassword(password);

      const setNewUser = await User.findByIdAndUpdate(
        { _id: id },
        { password: newPassword }
      );
      setNewUser.save();
      res.status(201).json({ status: 201, setNewUser });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

router.put("/ban-user", async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.isBanned = true;
    await user.save();

    res.json({ message: "User banned successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

//User Profile
// router.get("/profile", verify,  getUserProfile)

module.exports = router;
