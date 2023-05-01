const express = require('express')
const { addServiceProvider, updateService, getService } = require('../controllers/addServiceProviderController')
const verifyJWT = require('../middleware/verifyJWT')

const router = express.Router()

router.post('/', verifyJWT, addServiceProvider)

//UPDATE
router.put("/:id",  updateService)

//Get one
router.get('/bservice/:id', getService)

module.exports = router