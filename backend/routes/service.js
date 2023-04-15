const express = require('express')
const { addServiceProvider } = require('../controllers/addServiceProviderController')
const verifyJWT = require('../middleware/verifyJWT')

const router = express.Router()

router.post('/', verifyJWT, addServiceProvider)

module.exports = router