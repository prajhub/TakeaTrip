const express = require('express')
const { createLocation, getSingleLocation, deleteLocation } = require('../controllers/locationController')

const router = express.Router()

router.post('/', createLocation)
router.get('/:name/:locationId', getSingleLocation )
router.delete('/delete/:countryId/:locationId', deleteLocation)






module.exports = router;