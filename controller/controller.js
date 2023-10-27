const { PrismaClient } = require('@prisma/client');
const { ResponseTemplate } = require('../helper/helper');

const prisma = new PrismaClient();

async function getUsers(req, res) {
    const { name, email } = req.query;
    const payload = {};

    if (name) {
        payload.name = name
    }
    if (email) {
        payload.email = email
    }

    try {
        const users = await prisma.users.findMany({
            where: payload,
            orderBy: {
                id: 'asc'
            }
        });
        let resp = ResponseTemplate(users, 'success', null, 200);
        res.json(resp);
        return;
    } catch(error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.json(resp);
        return;
    }
};

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
        const accounts = await prisma.accounts.findMany({
            where: payload,
            orderBy: {
                id: 'asc'
            }
        });
        let resp = ResponseTemplate(accounts, 'success', null, 200);
        res.json(resp);
        return;
    } catch(error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.json(resp);
        return;
    }
};

async function getTransactions(req, res) {
    const { source_account_id, destination_account_id } = req.query;
    const payload = {};

    if (source_account_id) {
        payload.source_account_id = source_account_id
    }
    if (destination_account_id) {
        payload.destination_account_id = destination_account_id
    }

    try {
        const transactions = await prisma.transactions.findMany({
            where: payload,
            orderBy: {
                id: 'asc'
            }
        });
        let resp = ResponseTemplate(transactions, 'success', null, 200);
        res.json(resp);
        return;
    } catch(error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.json(resp);
        return;
    }
};

async function postUser(req, res) {
    const { name, email, password } = req.body;
    const payload = {
        name,
        email,
        password
    };

    try {
        const users = await prisma.users.create({
            data: payload
        });
        let resp = ResponseTemplate(users, 'success', null, 200);
        res.json(resp);
        return;
    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.json(resp);
        return;
    };
};

async function postAccount(req, res) {
    const { user_id, bank_name, bank_account_number, balance } = req.body;
    const payload = {
        user_id,
        bank_name,
        bank_account_number,
        balance
    };

    try {
        const accounts = await prisma.user.create({
            data: payload
        });
        let resp = ResponseTemplate(accounts, 'success', null, 200);
        res.json(resp);
        return;
    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.json(resp);
        return;
    };
};

async function postTransaction(req, res) {
    const { source_account_id, destination_account_id, amount } = req.body;
    const payload = {
        source_account_id,
        destination_account_id,
        amount
    };

    try {
        const transactions = await prisma.user.create({
            data: payload
        });
        let resp = ResponseTemplate(transactions, 'success', null, 200);
        res.json(resp);
        return;
    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.json(resp);
        return;
    };
};

module.exports = {
    getUsers,
    getAccounts,
    getTransactions,
    postUser,
    postAccount,
    postTransaction
}