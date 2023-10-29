const { PrismaClient } = require('@prisma/client');
const { ResponseTemplate } = require('../helper/helper');

const prisma = new PrismaClient();

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
        let resp = ResponseTemplate(transactions, 'get data success', null, 200);
        res.json(resp);
        return;
    } catch(error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.json(resp);
        return;
    }
};

async function postTransaction(req, res) {
    const { source_account_id, destination_account_id, amount } = req.body;
    const payload = {
        source_account_id: parseInt(source_account_id),
        destination_account_id: parseInt(destination_account_id),
        amount: parseFloat(amount)
    };

    try {
        const transactions = await prisma.transactions.create({
            data: payload
        });
        let resp = ResponseTemplate(transactions, 'input data success', null, 200);
        res.json(resp);
        return;
    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.json(resp);
        return;
    };
};

async function getTransactionById(req, res) {
    const { id } = req.params;

    try {
        const transactions = await prisma.transactions.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                from_account: {
                    include: {
                        user: true
                    }
                },
                to_account: {
                    include: {
                        user: true
                    }
                }
            }
        });
        let resp = ResponseTemplate(transactions, 'get data success', null, 200);
        res.json(resp);
        return;
    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.json(resp);
        return;
    };
};

module.exports = {
    getTransactions,
    postTransaction,
    getTransactionById,
};