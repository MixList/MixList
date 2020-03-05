const router = require('express').Router()
// const playlistRouter = require('./playlistRouter')
const userRouter = require('./userRouter')
const errorHandling = require('../middlewares/errorHandling')
const authentication = require('../middlewares/authentication')

router.use('/users', userRouter)
router.use(authentication)
// router.use('/playlist', playlistRouter)

router.use(errorHandling)

module.exports = router