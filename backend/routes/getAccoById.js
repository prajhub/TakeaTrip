const express = require('express');
const router = express.Router()

const User = require('../model/user')
const Accommodation = require('../model/accommodation')
const verifyJWT = require('../middleware/verifyJWT')

router.get('/:id', verifyJWT, async (req, res) => {

  const userId = req.params.id;

  try {
    const user = await User.findById(userId).populate('properties');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Find accommodations with owner matching user ID
    const accommodations = await Accommodation.find({ owner: userId });

    if (!accommodations) {
      return res.status(404).json({ message: 'Accommodations not found' });
    }

    return res.status(200).json(accommodations);

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }   

})


module.exports = router;