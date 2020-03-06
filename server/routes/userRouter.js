const router = require('express').Router()
const userController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

//   >>>>>>>> /users

router.post('/login', userController.login)
router.get('/', userController.readAllUsers)
router.post('/register', userController.register)
router.post('/googleLogin', userController.googleLogin)
router.post('/edit', authentication, userController.editPassword)

module.exports = router