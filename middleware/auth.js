function ensureAuthenticated(req) {
  return req.isAuthenticated()
}

function getUser(req) {
  return req.user || null
}

const authenticated = (req, res, next) => {
  if (ensureAuthenticated(req)) {
    if(getUser(req) === 'admin') {
      res.redirect('/admin/tweets')
    } else {
      return next()
    }
  }
  req.flash('error_messages', '請先登入')
  res.redirect('/signin')
}

const authenticatedAdmin = (req, res, next) => {
  if (ensureAuthenticated(req)) {
    if(getUser(req).role === 'admin') {
      return next()
    }
    res.redirect('/')
  } else {
    res.redirect('/signin')
  }
}

module.exports = {
  authenticated,
  authenticatedAdmin
}