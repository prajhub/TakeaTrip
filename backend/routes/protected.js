const express = require('express');
const router = express.Router()



router.get('/',  (req, res) => {

    res.json({ message: 'You are authenticated'})
})

module.exports = router;