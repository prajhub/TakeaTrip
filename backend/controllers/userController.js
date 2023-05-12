const asyncHandler = require("express-async-handler");

const User = require("../model/user");
const { hashPassword } = require("../utils/helpers");

const bcrypt = require("bcryptjs");

const updateUser = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, photo } = req.body;
  const { id } = req.params;

  //Confirm data
  if (!id || !email) {
    res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check if the provided password matches the stored password
  if (password) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
  }

  //Checking for same usr

  const duplicate = await User.findOne({ email }).lean().exec();

  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate Username" });
  }

  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.photo = photo;

  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.email} updated` });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User id is required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }

  const result = await user.deleteOne();

  const reply = `Username ${result.email} with ID ${result._id} deleted`;

  res.json(reply);
});

const getUser = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userDetails = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isVerified: user.isVerified,
      hasBookedRoom: user.hasBookedRoom,
      hasListedProperty: user.hasListedProperty,
      photo: user.photo,
    };
    return res.json(userDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userDetails = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isVerified: user.isVerified,
      hasBookedRoom: user.hasBookedRoom,
      hasListedProperty: user.hasListedProperty,
    };
    return res.json(userDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ isBanned: { $ne: true } })
    .select("-password")
    .lean();
  if (!users) {
    return res.status(400).json({ message: "No user " });
  }

  res.json(users);
});

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  getUsers,

  getUserById,
};
