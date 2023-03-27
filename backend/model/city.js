const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({

    name: String,
    type: String,
    country: String, 
    latitude: Number,
    longitude: Number,
    accommodations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'accommodation',
      },
    ],
    photos: [
      {
        id: String,
        type: String
      },
    ],

});


module.exports = mongoose.model('city', citySchema);