const express = require('express')
const { createCountry, getSingleCountry, getAllCountries, deleteCountry } = require('../controllers/countryController')

const router = express.Router()

router.post('/', createCountry)
router.get('/countries', getAllCountries)
router.get('/:name', getSingleCountry)
router.delete('/delete/:name', deleteCountry)



module.exports = router;