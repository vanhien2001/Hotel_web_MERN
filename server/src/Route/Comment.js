const express = require('express');
const router = express.Router();
const commentController = require('../Controller/CommentController')

router.get('/', commentController.showAll)
router.get('/:id', commentController.show)
router.post('/store', commentController.store)
router.put('/:id', commentController.update)
router.delete('/:id', commentController.delete)

module.exports = router 