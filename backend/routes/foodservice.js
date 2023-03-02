const express = require('express');

const { createNewFoodService} = require('../controllers/foodServiceController')

const router = express.Router()

//CREATE
router.post('/', createNewFoodService)


module.exports = router;