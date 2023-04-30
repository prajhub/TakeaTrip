const express = require('express')
const { addServiceProvider, updateService } = require('../controllers/addServiceProviderController')
const verifyJWT = require('../middleware/verifyJWT')

const router = express.Router()

router.post('/', verifyJWT, addServiceProvider)

//UPDATE
router.put("/:id",  updateService)

module.exports = router