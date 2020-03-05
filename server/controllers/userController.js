'use strict'
const { User } = require('../models')
const bcryptFunction = require('../helpers/hashingCompare')
const jwt = require('jsonwebtoken')

class UserController {
  static readAllUsers(req, res, next) {
    User
      .findAll()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
        // console.log(err);
      })
  }

  static login(req, res, next) {
    const { username, password, email } = req.body

    User
      .findOne({
        where: {
          email: email
        }
      })
      .then(result => {
        const compare = bcryptFunction.compare(password, result.password)
        // console.log(compare);
        if (compare) {
          const token = jwt.sign({
            id: result.id,
            email: result.email,
            username: result.username
          }, process.env.secret)
          res.status(200).json(token)
        } else {
          throw {
            status: 400,
            msg: 'Invalid Username/Password'
          }
        }
      })
      .catch(err => {
        next(err)
        // console.log('woeoeoee')
      })
  }
  static register(req, res, next) {
    const { username, email, password } = req.body
    User
      .create({
        username,
        email,
        password
      })
      .then(result => {
        const token = jwt.sign({
          id: result.id,
          username: result.username,
          email: result.email
        }, process.env.secret)
          res.status(201).json(token)
      })
      .catch(err => {
        // console.log(err);
        next(err)
      })
  }

}

module.exports = UserController