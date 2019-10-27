const express = require('express');

const router = express.Router();

router.use('/', require('./people'));
// router.use('/', require('./xxxxx'));
// router.use('/', require('./yyyyy'));

module.exports = router;
