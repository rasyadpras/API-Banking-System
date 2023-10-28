const express = require('express');
const router = express.Router();
const {
    getAccounts,
    postAccount,
    getAccountById,
} = require('../controller/controller_account');
const { checkPostAccount } = require('../middleware/middleware');

router.get('/', getAccounts);
router.post('/', checkPostAccount, postAccount);
router.get('/:id', getAccountById);

module.exports = router;