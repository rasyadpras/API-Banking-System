const express = require('express');
const router = express.Router();
const {
    getUsers,
    postUser,
    getUserById,
    updateUser,
    deleteUser
} = require('../controller/controller_user');
const { checkPostUser } = require('../middleware/middleware');

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *      - "User"
 *     summary: Find all user
 *     responses:
 *       200:
 *         description: Get data success
 *       500:
 *         description: Internal server error
 */
router.get('/', getUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *      - "User"
 *     summary: Insert new user
 *     responses:
 *       201:
 *         description: New user created
 *       500:
 *         description: Internal server error
 */
router.post('/', checkPostUser, postUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *      - "User" 
 *     summary: Find user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Get data success
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *      - "User"
 *     summary: Update data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Update data success
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *      - "User" 
 *     summary: Delete user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Delete data success
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteUser);

module.exports = router;