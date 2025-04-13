const express = require('express');
const router = express.Router();

const controller = require('./controller');
const middleware = require('./middleware');

router.get('/', controller)

module.exports = router;