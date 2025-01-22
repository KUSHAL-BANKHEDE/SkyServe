const { Route } = require('express');
const express = require('express');
const { register, retain } = require('./controller/auth');
const router = express.Router();

router.post('/register' , register);
router.get('/files/:userId', retain);

module.exports = router; 