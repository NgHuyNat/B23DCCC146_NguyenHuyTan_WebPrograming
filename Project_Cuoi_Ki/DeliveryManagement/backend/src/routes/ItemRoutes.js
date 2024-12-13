const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController');

router.get('/', ItemController.getAllItems);
router.post('/', ItemController.addItem);
router.put('/:id', ItemController.updateItem);
router.delete('/:id', ItemController.deleteItem);

module.exports = router;