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
        res.status(200).json(resp);
        return;
    } catch(error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.status(500).json(resp);
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
        let resp = ResponseTemplate(transactions, 'input data success', null, 201);
        res.status(201).json(resp);
        return;
    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.status(500).json(resp);
        return;
    };
};

async function getTransactionById(req, res) {
    const { id } = req.params;

    try {
        const findTransaction = await prisma.transactions.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!findTransaction) {
            let resp = ResponseTemplate(null, 'transaction not found', null, 404);
            res.status(404).json(resp);
            return;
        };

        const transactions = await prisma.transactions.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                amount: true,
                transaction_date: true,
                updated_at: true,
                source_account_id: true,
                from_account: {
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
                },
                destination_account_id: true,
                to_account: {
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
                }
            }
        });
        let resp = ResponseTemplate(transactions, 'get data success', null, 200);
        res.status(200).json(resp);
        return;
    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.status(500).json(resp);
        return;
    };
};

module.exports = {
    getTransactions,
    postTransaction,
    getTransactionById,
};