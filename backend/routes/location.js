const express = require('express')
const { createLocation, getSingleLocation } = require('../controllers/locationController')

const router = express.Router()

router.post('/', createLocation)
router.get('/:name/:locationId', getSingleLocation )




module.exports = router;