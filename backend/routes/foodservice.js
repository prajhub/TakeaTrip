const express = require('express');

const { createNewFoodService, updateFoodService, getFoodServices, deleteFoodService } = require('../controllers/foodServiceController')

const router = express.Router()

//CREATE
router.post('/', createNewFoodService)


//UPDATE
router.put("/:id",  updateFoodService)

//Get ALL
router.get('/', getFoodServices)

//DELETE
router.delete("/:id",  deleteFoodService)


module.exports = router;