'use strict'
const { User } = require('../models')
const bcryptFunction = require('../helpers/hashingCompare')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

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
        next(err)
      })
  }

  static googleLogin(req, res, next) {
    const { token } = req.body
    let usernameGoogle;
    client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    })
        .then(ticket=>{
          usernameGoogle = ticket.payload.name

          return User.findOne({
            where: {
              email: ticket.payload.email
            }
          })
        })
        .then(result => {
          if (!result) {
            return User.create({
              email: payload.email,
              password: "123456",
              username: usernameGoogle.split(" ").join("")
            })
          } else {
            return result;
          }
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
          next(err)
        })

    }

    static editPassword(req, res, next){
      let oldPass = req.body.oldPassword;
      let newPass = req.body.newPassword;
      User.findOne({
        where: {
          id: req.user.id
        }
      })
      .then(data=>{
          let compareOldPass = bcryptFunction.compare(oldPass, data.password)

          if(compareOldPass){
            return User.update({
              password: newPass
            }, {
              where: {
                id: req.user.id
              }, individualHooks: true
            })
          }else{
            throw {
              msg: 'wrong password',
              status: 401
            }
          }
        })
        .then(data=>{
          res.status(200).json('Berhasil mengganti password');
        })
        .catch(err=>{
          next(err)
        })
    }
  }


module.exports = UserController