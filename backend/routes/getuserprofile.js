const express = require('express');
const router = express.Router()

const User = require('../model/user')

router.get('/',  async (req, res) => {

    const userId = req.user.userId;
    
    if (userId) {
      try {
        const user = await User.findById(userId);
        if (user) {
          const { _id, email, firstName,  lastName } = user;
          res.json({ id: _id, email, firstName, lastName });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    } else {
      res.status(401).json({ message: 'You are not authenticated' });
    }

})

module.exports = router;