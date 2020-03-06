const router = require('express').Router()
const userController = require('../controllers/userController')

//   >>>>>>>> /users

router.post('/login', userController.login)
router.get('/', userController.readAllUsers)
router.post('/register', userController.register)
router.post('/googleLogin', userController.googleLogin)

module.exports = router