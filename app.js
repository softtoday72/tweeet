if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./config/passport')
const routes = require('./routes')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const port = process.env.PORT || 3000
const SESSION_SECRET = 'secret'
const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  //res.locals.logInUser = getUser(req)
  next()
})

app.use(routes)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app