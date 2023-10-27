const express = require('express');
const router = express.Router();
const {
    getTransactions,
    postTransaction,
    getTransactionById,
} = require('../controller/controller_transaction');

router.get('/', getTransactions);

router.post('/', postTransaction);

router.get('/:id', getTransactionById);

module.exports = router;