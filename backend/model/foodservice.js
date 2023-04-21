const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true
  },
  availableDates: {
    type: [Date],
    default: []
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
},
});

const FoodServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  owner: {
    type: String
},
photos: [
  
   
       String
  
  
],
  address: {
    type: String,
    required: true
  },
  reviews: [{
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: 'Value is not an integer'
    }
  }],
  contact: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  type: {
    type: String,
    required: true
  },
  tables: [TableSchema]
});

module.exports = mongoose.model('foodservice', FoodServiceSchema);
