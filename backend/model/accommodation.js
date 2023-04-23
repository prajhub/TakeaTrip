const mongoose = require('mongoose')


const AccommodationSchema = new mongoose.Schema({
    accommodation: {
        type: Boolean,
        default: true,
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    city: {
        type: String,
      
    },

    
    country:{
        type: String
    },
    address: {
        type: String,
        required: true
    },
    
    photos: [
        String
 ],
   
    desc: {
        type: String,
            
    },
    numofRooms: {
        type: String,
    },
    checkinTime: {
        type: String,
    },
    checkoutTime: {
        type: String
    },
    frontDesk:{
        type: Boolean,
    },
    checkInProperty: {
        type: Boolean
    },
    amenities: {
        type: [String]
    },
   selfCheckIn: {
    type: Boolean,
   },
   
    rating: {
        type: Number,
        
        min:0,
        max:10,
    },
    cheapestPrice: {
        type: Number,
        
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