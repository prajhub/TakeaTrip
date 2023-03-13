const express = require('express')
const { getCity } = require('../controllers/cityController')

const router = express.Router()

router.get('/:name', getCity)

module.exports = router