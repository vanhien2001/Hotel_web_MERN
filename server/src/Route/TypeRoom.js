const express = require('express');
const router = express.Router();
const typeRoomController = require('../Controller/TypeRoomController');
const verifyRole = require('../Middleware/roleAuth');

router.get('/', typeRoomController.showAll)
router.get('/restore', typeRoomController.restoreMulti) // Can't use put or patch request ?????
router.get('/statistics', typeRoomController.statistics)
router.get('/:id', typeRoomController.show)
router.post('/store', verifyRole, typeRoomController.store)
router.put('/:id', verifyRole, typeRoomController.update)
router.delete('/:id', verifyRole, typeRoomController.delete)
router.delete('/', verifyRole, typeRoomController.deleteMulti)
router.put('/:id/restore', verifyRole, typeRoomController.restore)


module.exports = router 