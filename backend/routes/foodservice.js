const express = require('express');

const { createNewFoodService, updateFoodService, deleteFoodService } = require('../controllers/foodServiceController')

const router = express.Router()

//CREATE
router.post('/', createNewFoodService)


//UPDATE
router.put("/:id",  updateFoodService)

//DELETE
router.delete("/:id",  deleteFoodService)


module.exports = router;