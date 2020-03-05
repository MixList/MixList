'use strict'
const jwt = require('jsonwebtoken')

function authentication (req, res, next) {
  try {
    const token = req.headers.token
    const user = jwt.verify(token)
    req.user = user
    next()
  } catch (error) {
    throw {
      status: 401,
      msg: 'wrong email/password.'
    }
  }
}


module.exports = authentication