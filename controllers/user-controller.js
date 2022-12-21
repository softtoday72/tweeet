const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db
const { Op } = require('sequelize')

const userController = {
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: (req, res) => {
    if(req.user.role === 'admin') {
      req.flash('error_messages', '帳號不存在')
      req.logout()
      res.redirect('/signin')
    }
    req.flash('success_messages', '登入成功')
    res.redirect('/tweet')
  },
  signUpPage: (req, res) => {
    res.render('register')
  }
}

module.exports = userController