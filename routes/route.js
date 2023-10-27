const express = require('express');
const router = express.Router();

router.get('/api/v1/users', (req, res) => {
    res.json({
        "data": null,
        "message": "ini users",
        "status": 200
    })
});

router.get('/api/v1/accounts', (req, res) => {
    res.json({
        "data": null,
        "message": "ini accounts",
        "status": 200
    })
});

router.get('/api/v1/transactions', (req, res) => {
    res.json({
        "data": null,
        "message": "ini transactions",
        "status": 200
    })
});

router.get('/*', (req, res) => {
    res.send('Halaman tidak ditemukan')
});



module.exports = router;