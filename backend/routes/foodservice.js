const express = require('express');

const { createNewFoodService, updateFoodService, getFoodServices, getFoodService, deleteFoodService } = require('../controllers/foodServiceController')
const verifyJWT = require('../middleware/verifyJWT')
const upload = require('../utils/multer')

const router = express.Router()

//CREATE
router.post('/', verifyJWT, upload.array('foodserviceimages', 10), createNewFoodService)


//UPDATE
router.put("/:id",  updateFoodService)

//Get ALL
router.get('/', getFoodServices)

//Get one
router.get('/service/:id', getFoodService)

//DELETE
router.delete("/:id",  deleteFoodService)


module.exports = router;