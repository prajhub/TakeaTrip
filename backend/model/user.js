const mongoose = require("mongoose");
const refreshToken = require("./refreshToken").schema;

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: mongoose.SchemaTypes.String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: mongoose.SchemaTypes.String,
      required: true,
      min: 2,
      max: 50,
    },
    password: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    email: {
      type: mongoose.SchemaTypes.String,
      required: true,
      unique: true,
      max: 50,
    },
    country: {
      type: mongoose.SchemaTypes.String,
      // required: true
    },
    foodservices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodservice",
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: mongoose.SchemaTypes.String,
      default: "User",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    photo: [String],
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],

    properties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "accommodation",
      },
    ],

    location: String,
    aboutMe: String,
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],

    hasListedProperty: {
      type: Boolean,
      default: false,
    },
    hasBookedRoom: {
      type: Boolean,
      default: false,
    },

    //For reset password
    verifytoken: {
      type: String,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
