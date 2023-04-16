const mongoose = require('mongoose')


const RoomSchema = new mongoose.Schema({

    type: {
        type: String,
        required: true,
    },
    roomclass:{
        type: String,
        required: true,
    },
    bedrooms: {
        type: String,
    },
    livingroom: {
        type: Boolean,
    },
    numofrooms:{
        type: String,
    },
    property: {
        type:String
    },
    price: {
        type: Number,
        required: true
    },
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
    desc: {
        type: String,
        
    },
    roomNumbers: [{number: Number, unavailableDates: {type: [Date]}}],
}, { timestamps: true })

module.exports = mongoose.model('rooms', RoomSchema);