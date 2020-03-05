'use strict'

function showError(err, req, res, next) {
  res.status(500).json(err)
  // console.log(err);
}

module.exports = showError