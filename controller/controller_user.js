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
            },
            include: {
                profiles: true,
            },
        });
        let resp = ResponseTemplate(users, 'get data success', null, 200);
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
        let resp = ResponseTemplate(users, 'input data success', null, 200);
        res.json(resp);
        return;
    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.json(resp);
        return;
    };
};

async function getUserById(req, res) {
    const { id } = req.params;

    try {
        const users = await prisma.users.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                profiles: true,
            },
        });
        let resp = ResponseTemplate(users, 'get data success', null, 200);
        res.json(resp);
        return;
    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.json(resp);
        return;
    };
};

async function updateUser(req, res) {
    const { name, email, password } = req.body;
    const { id } = req.params;
    const payload = {};

    if (!name && !email && !password) {
        let resp = ResponseTemplate(null, 'bad request', null, 400);
        res.json(resp);
        return;
    }

    if (name) {
        payload.name = name
    }
    if (email) {
        payload.email = email
    }
    if (password) {
        payload.password = password
    }

    try {
        const users = await prisma.users.update({
            where: {
                id: Number(id)
            },
            data: payload
        });
        let resp = ResponseTemplate(users, 'update data success', null, 200);
        res.json(resp);
        return;
    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.json(resp);
        return;
    };
};

async function deleteUser(req, res) {
    const { id } = req.params;

    try {
        const users = await prisma.users.delete({
            where: {
                id: Number(id)
            },
        });
        let resp = ResponseTemplate(null, 'delete data success', null, 200);
        res.json(resp);
        return;
    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.json(resp);
        return;
    }
};

module.exports = {
    getUsers,
    postUser,
    getUserById,
    updateUser,
    deleteUser
};