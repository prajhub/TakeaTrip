const mongoose = require('mongoose');
const refreshToken = require('./refreshToken').schema;


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
        type: mongoose.SchemaTypes.String,
        // required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    roles: {
        type: mongoose.SchemaTypes.String,
        default: 'User'
    }
    ,
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
      }],
      isServiceProvider: {
        type: Boolean,
        default: false
      },
      properties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'accommodation'
    }],
   
    followers: {
        type: Array,
        default: [],
    },
    location: String,
    aboutMe: String,
    
}, {timestamps: true })

module.exports = mongoose.model('users', UserSchema);