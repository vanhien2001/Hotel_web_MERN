const express = require('express');
const router = express.Router();
const typeRoomController = require('../Controller/TypeRoomController')

router.get('/', typeRoomController.showAll)
router.get('/restore', typeRoomController.restoreMulti) // Can't use put or patch request ?????
router.get('/:id', typeRoomController.show)
router.post('/store', typeRoomController.store)
router.put('/:id', typeRoomController.update)
router.delete('/:id', typeRoomController.delete)
router.delete('/', typeRoomController.deleteMulti)
router.put('/:id/restore', typeRoomController.restore)


module.exports = router 