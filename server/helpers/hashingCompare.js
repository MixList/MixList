const bcrypt = require('bcrypt')

function hashing(password) {
  const salt = 10;
  return bcrypt.hashSync(password, salt);
}

function compare(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {
  hashing,
  compare
}