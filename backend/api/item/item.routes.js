const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {log} = require('../../middlewares/logger.middleware')
const {addItem, getItems, deleteItem, getItem, updateItem} = require('./item.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getItems)
router.get('/:id', getItem)
router.post('/', addItem)
router.put('/', updateItem)
router.delete('/:id', deleteItem)

module.exports = router