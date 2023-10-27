const express = require('express');
const router = express.Router();
const {
    getUsers,
    postUser,
    getUserById
} = require('../controller/controller_user');
const { checkPostUser } = require('../middleware/middleware');

router.get('/', getUsers);
router.post('/', checkPostUser, postUser);
router.get('/:id', getUserById);

module.exports = router;