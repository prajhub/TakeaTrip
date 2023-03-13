const mongoose = require('mongoose')

const continentSchema = new mongoose.Schema({

    name: String,
    type: String,
    
    latitude: Number,
    longitude: Number,
    photos: [
        {
          id: { type: String, required: true },
          url: { type: String, required: true },
        },
      ]

});


module.exports = mongoose.model('continent', continentSchema);