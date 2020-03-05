require('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASS,
    "database": "MixList",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
