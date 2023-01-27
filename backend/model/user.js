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
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number,
    },
    refreshToken: String,
    followers: {
        type: Array,
        default: [],
    },
    location: String,
    aboutMe: String,
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date(),
    }
})

module.exports = mongoose.model('users', UserSchema);