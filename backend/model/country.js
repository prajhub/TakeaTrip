const mongoose = require('mongoose')


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
    cities: [String],
    desc: {
        type: String,
        
    },
    accommodations: {
        type: [String],

    },
    photos: {
        type: [String]
    },
    
    thingstodo: {
        type: [String]
    }
})


module.exports = mongoose.model('country', CountrySchema);