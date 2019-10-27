const express = require('express');
const { cors, corsOptions } = require('../middlewares/cors');

const router = express.Router();

const path = '/peoples';

router.options(path, cors); // enable pre-flight request
router.options(`${path}/:id`, cors); // enable pre-flight request

router.get(path, corsOptions, (req, res) => {
    res.json([{id: 0, name: 'Rumen Neshev'}]);
});

// router.post(path, corsOptions, (req, res) => {
// });

// router.put(`${path}/:id`, corsOptions, (req, res) => {
// });

// router.delete(`${path}/:id`, corsOptions, (req, res) => {
// });

module.exports = router;
