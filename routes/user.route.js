const express = require('express');
const router = express.Router();
const {
    TestUser,
    getUsers,
    postUser,
} = require('../controller/controller');
const { checkPostUser } = require('../middleware/middleware');

router.get('/', getUsers);

router.post('/', checkPostUser, postUser);

module.exports = router;