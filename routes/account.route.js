const express = require('express');
const router = express.Router();
const {
    getAccounts,
    postAccount,
    getAccountById,
    updateAccount,
    deleteAccount
} = require('../controller/controller_account');
const { checkPostAccount } = require('../middleware/middleware');

/**
 * @swagger
 * /accounts:
 *   get:
 *     tags:
 *      - "Account"
 *     summary: Find all account
 *     responses:
 *       200:
 *         description: Get data success
 *       500:
 *         description: Internal server error
 */
router.get('/', getAccounts);

/**
 * @swagger
 * /accounts:
 *   post:
 *     tags:
 *      - "Account"
 *     summary: Insert new account
 *     responses:
 *       201:
 *         description: New account created
 *       500:
 *         description: Internal server error
 */
router.post('/', checkPostAccount, postAccount);

/**
 * @swagger
 * /accounts/{id}:
 *   get:
 *     tags:
 *      - "Account" 
 *     summary: Find account by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the account
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Get data success
 *       404:
 *         description: Account not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getAccountById);

/**
 * @swagger
 * /accounts/{id}:
 *   put:
 *     tags:
 *      - "Account"
 *     summary: Update data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the account
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Update data success
 *       400:
 *         description: Bad request
 *       404:
 *         description: Account not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', updateAccount);

/**
 * @swagger
 * /accounts/{id}:
 *   delete:
 *     tags:
 *      - "Account" 
 *     summary: Delete account
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the account
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Delete data success
 *       404:
 *         description: Account not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteAccount);

module.exports = router;