const express = require('express');
const router = express.Router();
const messageController = require('../Controller/MessageController')

router.get('/', messageController.showAll)
router.get('/:id', messageController.show)
router.post('/store', messageController.store)
router.put('/:id', messageController.update)
router.delete('/:id', messageController.delete)

module.exports = router 