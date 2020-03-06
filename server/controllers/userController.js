'use strict'
const { User } = require('../models')
const bcryptFunction = require('../helpers/hashingCompare')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const sendEmail = require('../helpers/api')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


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
        let msg = sendEmail(result.email, `Hey, ${result.username}. You've been registered to MixList since ${new Date}. Enjoy your playlist. Have a nice day!`)
        sgMail.send(msg)
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

  static googleLogin(req, res, next) {
    const { token } = req.body
    // console.log(token, "masyukkk gakkk>>>??/");

    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();
      User.findOne({
        where: {
          email: payload.email,
        }
      })
        .then(result => {
          // console.log(result, "aosaosapsaslap");
          
          if (!result) {
            User.create({
              email: payload.email,
              password: "123456",
              username: payload.name.split(" ").join("")
            })
              .then(result => {
                // console.log(result);
                let msg = sendEmail(result.email, `Hey, ${result.username}. You've been registered to MixList since ${new Date}. Enjoy your playlist. Have a nice day!`)
                sgMail.send(msg)
                const token = jwt.sign({
                  username: result.username,
                  email: result.email
                }, process.env.secret)
                // console.log(token);
                res.status(201).json(token)
              })
              .catch(err => {
                next(err)
              })
          } else {
            const token = jwt.sign({
              username: result.username,
              email: result.email
            }, process.env.secret)
            res.status(200).json(token)
          }
        })

    }
    verify().catch(console.error);

  }
}

module.exports = UserController