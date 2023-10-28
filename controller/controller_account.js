const { PrismaClient } = require('@prisma/client');
const { ResponseTemplate } = require('../helper/helper');

const prisma = new PrismaClient();

async function getAccounts(req, res) {
    const { user_id, bank_name, bank_account_number } = req.query;
    const payload = {};

    if (user_id) {
        payload.user_id = user_id
    }
    if (bank_name) {
        payload.bank_name = bank_name
    }
    if (bank_account_number) {
        payload.bank_account_number = bank_account_number
    }

    try {
        const accounts = await prisma.bank_accounts.findMany({
            where: payload,
            orderBy: {
                id: 'asc'
            }
        });
        let resp = ResponseTemplate(accounts, 'get data success', null, 200);
        res.json(resp);
        return;
    } catch(error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.json(resp);
        return;
    }
};

async function postAccount(req, res) {
    const { user_id, bank_name, bank_account_number, balance } = req.body;
    const payload = {
        user_id: parseInt(user_id),
        bank_name,
        bank_account_number: parseInt(bank_account_number),
        balance: parseFloat(balance)
    };

    try {
        const accounts = await prisma.bank_accounts.create({
            data: payload
        });
        let resp = ResponseTemplate(accounts, 'input data success', null, 200);
        res.json(resp);
        return;
    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.json(resp);
        return;
    };
};

async function getAccountById(req, res) {
    const { id } = req.params;

    try {
        const accounts = await prisma.bank_accounts.findUnique({
            where: {
                id: Number(id)
            },
        });
        let resp = ResponseTemplate(accounts, 'get data success', null, 200);
        res.json(resp);
        return;
    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.json(resp);
        return;
    };
};

module.exports = {
    getAccounts,
    postAccount,
    getAccountById
};