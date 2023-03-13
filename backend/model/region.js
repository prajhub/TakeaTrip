const mongoose = require('mongoose')

const regionSchema = new mongoose.Schema({

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


module.exports = mongoose.model('region', regionSchema);