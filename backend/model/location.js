const mongoose = require('mongoose')

const LocationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    destinations: {
        type: [String]
    },
    desc: {
        type: String,
        required: true
    },
    hotel: {
        type: [String],

    },
    photo: {
        type: [String]
    },
    restaurant: {
        type: [String],
    },
    thingtodo: {
        type: [String]
    }
})



module.exports = mongoose.model('locations', LocationSchema);