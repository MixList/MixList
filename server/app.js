const express = require('express')
const app = express()
const PORT = 3000
const indexRouter = require('./routes/indexRouter')
const cors = require('cors')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', indexRouter)

app.listen(PORT, console.log('Listening to the port ' + PORT))


module.exports = app