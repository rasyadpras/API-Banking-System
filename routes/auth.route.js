const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/controller_auth');
const restrict = require('../middleware/restrict');

router.post('/register', register);
router.post('/login', login);
router.post('/whoami', restrict, (req, res) => {
    return res.status(200).json({
        status: 200,
        message: 'success',
        data: {
            user: req.user
        }
    })
})

module.exports = router;