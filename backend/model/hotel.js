const mongoose = require('mongoose')
const location = require('./location')

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    city: {
        type: mongoose.Schema.Types.String,
        ref: 'locations'
    },
    address: {
        type: String,
        required: true
    },
    
    photos: {
        type: [String],
        
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    amenities: {
        type: [String]
    },
    rating: {
        type: Number,
        
        min:0,
        max:10,
    },
    rooms: {
        type: [String]
    },
    // cheapestPrice: {
    //     type: Number,
    //     required: true
    // },
    featured: {
        type: Boolean,
        default: false,
    }
})




module.exports = mongoose.model('hotels', HotelSchema);