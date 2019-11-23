const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.send('Hi! Auth0 the best!');
});

module.exports = router;
