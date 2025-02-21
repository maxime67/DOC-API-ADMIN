const express = require('express');
const {healthStatus} = require("./healthController");
const router = express.Router();

router.get('/', healthStatus);

module.exports = router;
