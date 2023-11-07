const express = require('express');
const router = express.Router();
const {
    getTransactions,
    postTransaction,
    getTransactionById,
} = require('../controller/controller_transaction');
const { checkPostTransaction } = require('../middleware/middleware');

/**
 * @swagger
 * /transactions:
 *   get:
 *     tags:
 *      - "Transaction"
 *     summary: Find all transaction
 *     responses:
 *       200:
 *         description: Get data success
 *       500:
 *         description: Internal server error
 */
router.get('/', getTransactions);

/**
 * @swagger
 * /transactions:
 *   post:
 *     tags:
 *      - "Transaction"
 *     summary: Insert new transaction
 *     responses:
 *       201:
 *         description: New transaction created
 *       500:
 *         description: Internal server error
 */
router.post('/', checkPostTransaction, postTransaction);

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     tags:
 *      - "Transaction" 
 *     summary: Find transaction by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the transaction
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Get data success
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getTransactionById);

module.exports = router;