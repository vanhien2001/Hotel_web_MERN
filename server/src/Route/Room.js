const express = require('express');
const router = express.Router();
const roomController = require('../Controller/RoomController')
const upload = require('../Middleware/UploadImg')

router.get('/', roomController.showAll)
router.get('/restore', roomController.restoreMulti) // Can't use put or patch request ?????
router.get('/:id', roomController.show)
router.post('/store', upload.array('image',10), roomController.store)
router.put('/:id', upload.array('image',10), roomController.update)
router.delete('/:id', roomController.delete)
router.delete('/', roomController.deleteMulti)
router.put('/:id/restore', roomController.restore)


module.exports = router 