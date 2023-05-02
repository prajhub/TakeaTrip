const mongoose = require('mongoose')


const RoomSchema = new mongoose.Schema({

    type: {
        type: String,
       
    },
    roomclass:{
        type: String,
       
    },
    bedrooms: {
        type: String,
    },
    livingroom: {
        type: Boolean,
    },
    
    property: {
        type:String
    },
    price: {
        type: Number,
       
    },
    photos: [String],
    
    bathroom: {
        type: String
    },
    roomview: {
        type: String
    },
    inroomamenities: {
        type: [String],
    },


    kitchenamenities: {
        type: [String],
    },
    bedding: {
        type: [String],
    },
    inroomrefreshments: {
        type: [String],
    },

    
    maxPeople: {
        type: Number,
        
    },
    
    roomNumbers: [
        {
          number: Number, // room number
          fromdate: Date,
          todate: Date,
          userId: String,
        }
      ]
}, { timestamps: true })

module.exports = mongoose.model('rooms', RoomSchema);