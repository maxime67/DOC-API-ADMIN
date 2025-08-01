const express = require('express');
const router = express.Router();
const categoryController = require('./categoryController');

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategory);

module.exports = router;