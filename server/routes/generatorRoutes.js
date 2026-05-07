const express = require('express');
const { generate } = require('../controllers/generatorController');
const auth = require('../utils/auth');
const router = express.Router();

router.post('/', auth, generate);

module.exports = router;
