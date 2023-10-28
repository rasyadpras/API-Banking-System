const express = require('express');
const router = express.Router();
const {
    getTransactions,
    postTransaction,
    getTransactionById,
} = require('../controller/controller_transaction');
const { checkPostTransaction } = require('../middleware/middleware');

router.get('/', getTransactions);
router.post('/', checkPostTransaction, postTransaction);
router.get('/:id', getTransactionById);

module.exports = router;