const express = require('express');
const router = express.Router();
const jobController = require('../Controller/JobController');
const verifyRole = require('../Middleware/roleAuth');

router.get('/', jobController.showAll)
router.get('/restore', jobController.restoreMulti) // Can't use put or patch request ?????
router.get('/:id', jobController.show)
router.post('/store', verifyRole, jobController.store)
router.put('/:id', verifyRole, jobController.update)
router.delete('/:id', verifyRole, jobController.delete)
router.delete('/', verifyRole, jobController.deleteMulti)
router.put('/:id/restore', verifyRole, jobController.restore)


module.exports = router