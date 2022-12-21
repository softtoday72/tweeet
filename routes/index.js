const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const user = require('./modules/user')
const userController = require('../controllers/user-controller')
const { authenticated } = require('../middleware/auth')

router.use('/users',  user)

module.exports = router