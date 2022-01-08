const express = require('express');
const router = express.Router();
const serviceController = require('../Controller/ServiceController');
const verifyRole = require('../Middleware/roleAuth');

router.get('/', serviceController.showAll)
router.get('/restore', serviceController.restoreMulti) // Can't use put or patch request ?????
router.get('/statistics', serviceController.statistics)
router.get('/:id', serviceController.show)
router.post('/store', verifyRole, serviceController.store)
router.put('/:id', verifyRole, serviceController.update)
router.delete('/:id', verifyRole, serviceController.delete)
router.delete('/', verifyRole, serviceController.deleteMulti)
router.put('/:id/restore', verifyRole, serviceController.restore)


module.exports = router