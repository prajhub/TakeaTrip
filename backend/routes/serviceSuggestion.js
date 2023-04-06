const express = require('express')

const  { getServices } = require('../controllers/businessSuggestionController')


const router = express.Router()



router.get('/suggestions', getServices)

module.exports = router