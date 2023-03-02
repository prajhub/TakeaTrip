const mongoose = require('mongoose')


const FoodServiceSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    location: {
        type: mongoose.Schema.Types.String,
        ref: 'locations'
    },
    address: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    reviews: [{
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: 'Value is not an integer'
        }
    }],
    contact: {
        type: mongoose.Schema.Types.String,
        required: true,
    
    },
    website: {
        type: mongoose.Schema.Types.String
    },
    type: {
        type: mongoose.Schema.Types.String,
        required: true
    }
})

module.exports = mongoose.model('foodservice', FoodServiceSchema);