const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({

    name: String,
    type: String,
    country: String, 
    latitude: Number,
    longitude: Number,
    photos: [
      {
        id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],

});


module.exports = mongoose.model('city', citySchema);