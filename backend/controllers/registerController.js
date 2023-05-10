const User = require("../model/user");

require("dotenv").config();
const { hashPassword } = require("../utils/helpers");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const Token = require("../model/token");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

const handleNewUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email } = req.body;

  //Confirming Data
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ message: "All field required" });
  }

  //Checking for existing users

  const duplicate = await User.findOne({ email });

  if (duplicate) {
    return res.status(400).json({ message: "User exist" });
  } else {
    const password = hashPassword(req.body.password);
    const newUser = await User.create({ firstName, lastName, email, password });

    const token = await new Token({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${process.env.BASE_URL}users/${newUser._id}/verify/${token.token}`;
    await sendEmail(newUser.email, "Verify Email", url);

    res
      .status(201)
      .send({ message: "An email has been sent to verify yourt account" });
  }
});

module.exports = { handleNewUser };
