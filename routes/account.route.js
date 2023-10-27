const express = require('express');
const router = express.Router();
const {
    getAccounts,
    postAccount,
} = require('../controller/controller');
const { checkPostUser } = require('../middleware/middleware');

router.get('/', getAccounts);

router.post('/', postAccount);

module.exports = router;