const express = require('express');
const router = express.Router();
const documentationController = require('./documentationController');

router.get('/', documentationController.getAllDocumentation);
router.get('/category/:categoryId', documentationController.getDocumentationByCategory);
router.get('/search/:name', documentationController.getDocumentationByName);

module.exports = router;