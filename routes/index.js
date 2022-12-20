const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

router.use('/',  (req, res) => res.render('index'))
module.exports = router