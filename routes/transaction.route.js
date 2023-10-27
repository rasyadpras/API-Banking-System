const express = require('express');
const router = express.Router();
const {
    getTransactions,
    postTransaction,
} = require('../controller/controller');
const { checkPostUser } = require('../middleware/middleware');

router.get('/', getTransactions);

router.post('/', postTransaction);

module.exports = router;