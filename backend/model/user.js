const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
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
        type: String,
        // required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    accesToken: String,
    refreshToken: String,
    followers: {
        type: Array,
        default: [],
    },
    location: String,
    aboutMe: String,
    
}, {timestamps: true })

module.exports = mongoose.model('users', UserSchema);