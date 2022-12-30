const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db
const { Op } = require('sequelize')
const { getUser } = require('../helpers/helper')

const userController = {
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: (req, res) => {
    if (getUser(req).role === 'admin') {
      req.flash('error_messages', '帳號不存在！')
      req.logout()
      res.redirect('/signin')
    }
    req.flash('success_messages', '登入成功!')
    res.redirect('/tweets')
  },
  signUpPage: (req, res) => {
    res.render('register')
  },
  signUp: (req, res, next) => {
    const { account, name, email, password, checkPassword } = req.body
    const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
    if (!account || !email || !password) throw new Error('請確實填寫欄位!')
    if (password !== checkPassword) throw new Error('請確認密碼相同!')
    if (name.length > 50) throw new Error('名字字數超過上限!')
    if (email.search(emailRule) == -1) throw new Error('請確認Emaol格式!')
    Promise.all([User.findOne({ where: { email } }), User.findOne({ where: { account } })])
      .then(([userEmail, userAccount]) => {
        if (userEmail) throw new Error('email 已重複註冊！')
        if (userAccount) throw new Error('account 已重複註冊！')
        return bcrypt.hash(password, 10)
      })
      .then(hash => User.create({
        account,
        name,
        email,
        password: hash,
        avatar: 'https://dthezntil550i.cloudfront.net/dr/latest/dr2103190048518390019783696/2c52c1d2-e905-4bb2-8698-e569a7a1108b.png',
        cover: 'https://www.crazyppt.com/wp-content/uploads/2018/10/1-1PRG01119.jpg',
        role: 'user'
      }))
      .then(() => {
        req.flash('success_message', '成功註冊帳號!')
        res.redirect('/signin')
      })
      .catch(err => next(err))
  },
  logout: (req, res) => {
    req.flash('success_messages','登出成功')
    req.logout()
    res.redirect('/signin')
  }
}

module.exports = userController