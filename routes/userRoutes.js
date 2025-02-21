const express = require('express');
const {login, register, verify} = require("./userController");
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/verify', verify);

module.exports = router;
