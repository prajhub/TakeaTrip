const express = require('express');

const { createNewFoodService, updateFoodService, getFoodServices, getFoodService, deleteFoodService } = require('../controllers/foodServiceController')
const verifyJWT = require('../middleware/verifyJWT')


const router = express.Router()

//CREATE
router.post('/', verifyJWT, createNewFoodService)


//UPDATE
router.put("/:id",  updateFoodService)

//Get ALL
router.get('/', getFoodServices)

//Get one
router.get('/service/:id', getFoodService)

//DELETE
router.delete("/:id",  deleteFoodService)


module.exports = router;