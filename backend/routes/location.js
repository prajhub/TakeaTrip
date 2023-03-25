const express = require('express')
const { controlLocation } = require('../controllers/locationController')

const router = express.Router()

router.get('/:name', controlLocation)

module.exports = router