const express = require('express');
const router = express.Router()
const authController = require('../controllers/authController')
const refreshTokenController = require('../controllers/refreshTokenController');



router.post('/', authController.login);

router.get('/refresh', authController.refresh);

router.post('/logout', authController.logout)

module.exports = router;