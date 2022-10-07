const router = require('express').Router()
const authController = require('../controller/authController')

router.post('/register',authController.Register)
router.get('/',authController.get)

module.exports = router