const mongoose = require('mongoose')
const location = require('./location').schema

const CountrySchema = new mongoose.Schema({

    name: {
        type: String,
        

    },
    type: String,
    
    latitude: Number,
    longitude: Number,
    photos: [
        {
          id: { type: String, required: true },
          url: { type: String, required: true },
        },
      ],
    locations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'locations'
    }],
    desc: {
        type: String,
        
    },
    hotels: {
        type: [String],

    },
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


module.exports = mongoose.model('country', CountrySchema);