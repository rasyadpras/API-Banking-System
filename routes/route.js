const express = require('express');
const morgan = require('morgan');
const router = express.Router();
const userRoute = require('./user.route');
const accountRoute = require('./account.route');
const trxRoute = require('./transaction.route');
const authRoute = require('./auth.route');

router.use(morgan('dev'));

router.use('/api/v1', authRoute);
router.use('/api/v1/users', userRoute);
router.use('/api/v1/accounts', accountRoute);
router.use('/api/v1/transactions', trxRoute);

module.exports = router;