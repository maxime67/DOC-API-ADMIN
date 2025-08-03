const express = require('express');
const router = express.Router();
const categoryController = require('./categoryController');

router.get('/', categoryController.getAllCategories);

module.exports = router;