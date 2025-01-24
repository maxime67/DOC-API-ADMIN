const express = require('express');
const router = express.Router();
const documentationController = require('./documentationController');

router.post('/', documentationController.createDocumentation);
router.get('/', documentationController.getAllDocumentation);
router.get('/:id', documentationController.getDocumentation);
router.put('/:id', documentationController.updateDocumentation);
router.delete('/:id', documentationController.deleteDocumentation);
router.get('/category/:categoryId', documentationController.getDocumentationByCategory);
router.get('/search/:name', documentationController.getDocumentationByName);

module.exports = router;