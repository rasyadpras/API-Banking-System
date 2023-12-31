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
            },
            select: {
                id: true,
                bank_name: true,
                bank_account_number: true,
                balance: true,
                created_at: true,
                updated_at: true,
                user_id: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                        created_at: true,
                        updated_at: true
                    }
                }
            }
        });
        let resp = ResponseTemplate(accounts, 'get data success', null, 200);
        res.status(200).json(resp);
        return;
    } catch(error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.status(500).json(resp);
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
        let resp = ResponseTemplate(accounts, 'input data success', null, 201);
        res.status(201).json(resp);
        return;
    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.status(500).json(resp);
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
            select: {
                id: true,
                bank_name: true,
                bank_account_number: true,
                balance: true,
                created_at: true,
                updated_at: true,
                user_id: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                        created_at: true,
                        updated_at: true,
                        profiles: true
                    }
                }
            }
        });
        if (!accounts) {
            let resp = ResponseTemplate(null, 'account not found', null, 404);
            res.status(404).json(resp);
            return;
        } else {
            let resp = ResponseTemplate(accounts, 'get data success', null, 200);
            res.status(200).json(resp);
            return;
        }
    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.status(500).json(resp);
        return;
    };
};

async function updateAccount(req, res) {
    const { user_id, bank_name, bank_account_number, balance } = req.body;
    const { id } = req.params;
    const payload = {};

    if (!user_id && !bank_name && !bank_account_number && !balance) {
        let resp = ResponseTemplate(null, 'bad request', null, 400);
        res.status(400).json(resp);
        return;
    }

    if (user_id) {
        payload.user_id = user_id
    }
    if (bank_name) {
        payload.bank_name = bank_name
    }
    if (bank_account_number) {
        payload.bank_account_number = bank_account_number
    }
    if (balance) {
        payload.balance = balance
    }

    try {
        const findAccount = await prisma.bank_accounts.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!findAccount) {
            let resp = ResponseTemplate(null, 'account not found', null, 404);
            res.status(404).json(resp);
            return;
        };
        
        const accounts = await prisma.bank_accounts.update({
            where: {
                id: Number(id)
            },
            data: payload
        });
        if (!accounts) {
            let resp = ResponseTemplate(null, 'account not found', null, 404);
            res.status(404).json(resp);
            return;
        } else {
            let resp = ResponseTemplate(accounts, 'update data success', null, 200);
            res.status(200).json(resp);
            return;
        }
    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.status(500).json(resp);
        return;
    };
};

async function deleteAccount(req, res) {
    const { id } = req.params;

    try {
        const findAccount = await prisma.bank_accounts.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!findAccount) {
            let resp = ResponseTemplate(null, 'account not found', null, 404);
            res.status(404).json(resp);
            return;
        };

        const accounts = await prisma.bank_accounts.delete({
            where: {
                id: Number(id)
            },
        });
        if (!accounts) {
            let resp = ResponseTemplate(null, 'account not found', null, 404);
            res.status(404).json(resp);
            return;
        } else {
            let resp = ResponseTemplate(users, 'delete data success', null, 200);
            res.status(200).json(resp);
            return;
        }
    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.status(500).json(resp);
        return;
    }
};

module.exports = {
    getAccounts,
    postAccount,
    getAccountById,
    updateAccount,
    deleteAccount
};