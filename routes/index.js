const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const user = require('./modules/user')
const tweet = require('./modules/tweet')
const userController = require('../controllers/user-controller')
const { authenticated } = require('../middleware/auth')

router.use('/users', authenticated, user)
router.use('/tweets', authenticated, tweet) 

router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/logout', userController.logout)

router.use('/',  (req, res) => res.redirect('/tweets'))
module.exports = router