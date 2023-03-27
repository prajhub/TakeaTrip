const mongoose = require('mongoose')


const AccommodationSchema = new mongoose.Schema({
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
      
    },
    country:{
        type: String
    },
    address: {
        type: String,
        required: true
    },
    
    photos: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
        
    },
   
    desc: {
        type: String,
            
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
    },

    owner: {
        type: String
    }

})




module.exports = mongoose.model('accommodation', AccommodationSchema);