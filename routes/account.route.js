const express = require('express');
const router = express.Router();
const {
    getAccounts,
    postAccount,
    getAccountById,
    updateAccount,
    deleteAccount
} = require('../controller/controller_account');
const { checkPostAccount } = require('../middleware/middleware');

router.get('/', getAccounts);
router.post('/', checkPostAccount, postAccount);
router.get('/:id', getAccountById);
router.put('/:id', updateAccount);
router.delete('/:id', deleteAccount);

module.exports = router;