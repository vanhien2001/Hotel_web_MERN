const express = require('express');
const router = express.Router();
const staffController = require('../Controller/StaffController')
const verifyToken = require('../Middleware/userAuth')

router.get('/', staffController.showAll)
router.get('/load', verifyToken, staffController.load)
router.post('/login', staffController.login)
router.get('/restore', staffController.restoreMulti) // Can't use put or patch request ?????
router.get('/:id', staffController.show)
router.post('/store', staffController.store)
router.put('/:id', staffController.update)
router.delete('/:id', staffController.delete)
router.delete('/', staffController.deleteMulti)
router.put('/:id/restore', staffController.restore)


module.exports = router 