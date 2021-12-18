const express = require('express');
const router = express.Router();
const serviceController = require('../Controller/ServiceController')

router.get('/', serviceController.showAll)
router.get('/restore', serviceController.restoreMulti) // Can't use put or patch request ?????
router.get('/:id', serviceController.show)
router.post('/store', serviceController.store)
router.put('/:id', serviceController.update)
router.delete('/:id', serviceController.delete)
router.delete('/', serviceController.deleteMulti)
router.put('/:id/restore', serviceController.restore)


module.exports = router