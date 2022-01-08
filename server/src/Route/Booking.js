const express = require('express');
const router = express.Router();
const bookingController = require('../Controller/BookingController');

router.get('/', bookingController.showAll)
router.get('/restore', bookingController.restoreMulti) // Can't use put or patch request ?????
router.get('/:id', bookingController.show)
router.post('/store', bookingController.store)
router.put('/:id', bookingController.update)
router.delete('/:id', bookingController.delete)
router.delete('/', bookingController.deleteMulti)
router.put('/:id/restore', bookingController.restore)


module.exports = router 