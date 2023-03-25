const express = require('express')
const { createCountry, getSingleCountry, getAllCountries } = require('../controllers/countryController')

const router = express.Router()

router.post('/', createCountry)
router.get('/countries', getAllCountries)
router.get('/:name', getSingleCountry)




module.exports = router;