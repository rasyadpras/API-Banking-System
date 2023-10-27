const express = require('express');
const router = express.Router();
const {
    getAccounts,
    postAccount,
    getAccountById,
} = require('../controller/controller_account');

router.get('/', getAccounts);
router.post('/', postAccount);
router.get('/:id', getAccountById);

module.exports = router;