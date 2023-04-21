const express = require('express');

const { createNewFoodService, updateFoodService, getFoodServices, deleteFoodService } = require('../controllers/foodServiceController')
const verifyJWT = require('../middleware/verifyJWT')
const upload = require('../utils/multer')

const router = express.Router()

//CREATE
router.post('/', verifyJWT, upload.array('foodserviceimages', 10), createNewFoodService)


//UPDATE
router.put("/:id",  updateFoodService)

//Get ALL
router.get('/', getFoodServices)

//DELETE
router.delete("/:id",  deleteFoodService)


module.exports = router;