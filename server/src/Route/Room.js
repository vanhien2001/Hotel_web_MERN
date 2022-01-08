const express = require('express');
const router = express.Router();
const roomController = require('../Controller/RoomController');
const upload = require('../Middleware/UploadImg');
const verifyRole = require('../Middleware/roleAuth');

router.get('/', roomController.showAll)
router.get('/restore', roomController.restoreMulti) // Can't use put or patch request ?????
router.get('/statistics', roomController.statistics)
router.get('/:id', roomController.show)
router.post('/store', verifyRole, upload.array('image',10), roomController.store)
router.put('/:id', verifyRole, upload.array('image',10), roomController.update)
router.delete('/:id', verifyRole, roomController.delete)
router.delete('/', verifyRole, roomController.deleteMulti)
router.put('/:id/restore', verifyRole, roomController.restore)


module.exports = router 