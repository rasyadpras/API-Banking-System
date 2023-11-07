const express = require('express');
const router = express.Router();
const {
    getUsers,
    postUser,
    getUserById,
    updateUser,
    deleteUser
} = require('../controller/controller_user');
const { checkPostUser } = require('../middleware/middleware');

router.get('/', getUsers);
router.post('/', checkPostUser, postUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;