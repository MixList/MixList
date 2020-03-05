const router = require('express').Router()
const userRouter = require('./userRouter')
const errorHandling = require('../middlewares/errorHandling')
const authentication = require('../middlewares/authentication')
const playlistRouter = require('./playlistRouter.js')

router.use('/users', userRouter)
router.use(authentication)
router.use('/playlist', playlistRouter)

// router.use(errorHandling)

module.exports = router