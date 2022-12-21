const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user-controller')
const { authenticated } = require('../../middleware/auth')

router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router