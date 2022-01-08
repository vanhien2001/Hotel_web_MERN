const express = require('express');
const router = express.Router();
const staffController = require('../Controller/StaffController')
const verifyToken = require('../Middleware/userAuth')
const verifyRole = require('../Middleware/roleAuth')

router.get('/', staffController.showAll)
router.get('/load', verifyToken, staffController.load)
router.post('/login', staffController.login)
router.get('/restore', staffController.restoreMulti) // Can't use put or patch request ?????
router.get('/:id', staffController.show)
router.post('/store', verifyRole, staffController.store)
router.put('/:id', verifyRole, staffController.update)
router.delete('/:id', verifyRole, staffController.delete)
router.delete('/', verifyRole, staffController.deleteMulti)
router.put('/:id/restore', verifyRole, staffController.restore)


module.exports = router 