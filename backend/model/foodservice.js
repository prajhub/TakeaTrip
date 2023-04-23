const mongoose = require('mongoose');

const FoodServiceSchema = new mongoose.Schema({

  foodservice: {
    type: Boolean,
    default: true,
},


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
    
  },
  reviews: [{
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: 'Value is not an integer'
    }
  }],
  number: {
    type: String,
    
  },
  website: {
    type: String
  },
  type: {
    type: String,
    required: true
  },
  cuisines: [String],
  foods:[String],
  features: [String], 
  minPrice: {
    type: Number,
    
  },
  maxPrice: {
    type: Number,
    
  },
 
});

module.exports = mongoose.model('foodservice', FoodServiceSchema);
