"use strict"
const { Playlist } = require('../models')

module.exports = (req, res, next) => {
  const { id } = req.params.id
  Playlist
    .findOne({
      where: {
        UserId: id
      }
    })
    .then(result => {
      if (result) {
        next()
      }
    })
    .catch(err => {
      throw {
        status: 401,
        msh: "You don't have access (Not Authorized)."
      }
    })
}