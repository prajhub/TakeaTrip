const express = require('express');
const router = express.Router();
const Accommodation = require('../model/accommodation')
const FoodService = require('../model/foodservice')


const getServices = async (req, res) => {
    const query = req.query.q;
    const encodedQuery = encodeURIComponent(query);
  
    try {
      // Search for accommodations
      const accommodations = await Accommodation.find({ name: { $regex: encodedQuery, $options: 'i' } });
      // Search for food services
      const foodServices = await FoodService.find({ name: { $regex: encodedQuery, $options: 'i' } });
  
      // Combine the results and send them as JSON
      const suggestions = accommodations.concat(foodServices).map((result) => ({
        name: result.name,
        address: result.address,
        type: result.type,
      }));
  
      res.json(suggestions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  module.exports = { getServices };
  