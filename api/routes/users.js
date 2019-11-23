const express = require('express');
const router = express.Router();
const Users = require('../models/User');

router.get('/', function (req, res, next) {
    Users.find({}, function (err, users) {
        res.json(users);
    });
});

module.exports = router;
