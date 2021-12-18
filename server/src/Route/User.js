const express = require('express');
const router = express.Router();
const userController = require('../Controller/UserController')
const verifyToken = require('../Middleware/userAuth')

router.post('/login',userController.login)
router.get('/load', verifyToken, userController.load)
router.post('/register',userController.register)
router.post('/changePass',userController.changePassword)
router.post('/changeInfor',userController.changeInfor)

module.exports = router