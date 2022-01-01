const express = require('express');
const router = express.Router();
const conversationController = require('../Controller/ConversationController')

router.get('/', conversationController.showAll)
router.get('/:id', conversationController.show)
router.post('/store', conversationController.store)
router.put('/:id', conversationController.update)
router.delete('/:id', conversationController.delete)

module.exports = router 