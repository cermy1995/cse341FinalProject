const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/users', require('./users'));
router.use('/main', require('./main'));

module.exports = router;