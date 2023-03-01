const mongoose = require('mongoose')
const country = require('./country').schema;
const hotels = require('./hotel').schema

const LocationSchema = new mongoose.Schema({

    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'country',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    
    desc: {
        type: String,
        required: true
    },
    hotels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hotels'

    }],
    photos: {
        type: [String]
    },
    restaurants: {
        type: [String],
    },
    thingstodo: {
        type: [String]
    }
})



module.exports = mongoose.model('locations', LocationSchema);