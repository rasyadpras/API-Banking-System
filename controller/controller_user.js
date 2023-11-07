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
            select: {
                id: true,
                name: true,
                email: true,
                created_at: true,
                updated_at: true,
                profiles: true
            },
        });
        let resp = ResponseTemplate(users, 'get data success', null, 200);
        res.status(200).json(resp);
        return;
    } catch(error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.status(500).json(resp);
        return;
    }
};

async function postUser(req, res) {
    const { name, email, password, identity_type, identity_number, address } = req.body;
    const payload = {
        name,
        email,
        password,
        profiles: {
            create: {
                identity_type,
                identity_number,
                address
            }
        }
    };

    try {
        const users = await prisma.users.create({
            data: payload,
            select: {
                id: true,
                name: true,
                email: true,
                created_at: true,
                updated_at: true,
                profiles: true
            },
        });
        let resp = ResponseTemplate(users, 'input data success', null, 201);
        res.status(201).json(resp);
        return;
    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.status(500).json(resp);
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
            select: {
                id: true,
                name: true,
                email: true,
                created_at: true,
                updated_at: true,
                profiles: true
            },
        });
        if (!users) {
            let resp = ResponseTemplate(null, 'user not found', null, 404);
            res.status(404).json(resp);
            return;
        } else {
            let resp = ResponseTemplate(users, 'get data success', null, 200);
            res.status(200).json(resp);
            return;
        }
    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.status(500).json(resp);
        return;
    };
};

async function updateUser(req, res) {
    const { name, email, password, identity_type, identity_number, address } = req.body;
    const { id } = req.params;
    const payload = {};
    const profilePayload = {};

    if (!name && !email && !password && !identity_type && !identity_number && !address) {
        let resp = ResponseTemplate(null, 'bad request', null, 400);
        res.status(400).json(resp);
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
    if (identity_type) {
        profilePayload.identity_type = identity_type
    }
    if (identity_number) {
        profilePayload.identity_number = identity_number
    }
    if (address) {
        profilePayload.address = address
    }

    try {
        const findUser = await prisma.users.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!findUser) {
            let resp = ResponseTemplate(null, 'user not found', null, 404);
            res.status(404).json(resp);
            return;
        };

        const users = await prisma.users.update({
            where: {
                id: Number(id)
            },
            data: {
                ...payload,
                profiles: {
                    update: {
                        ...profilePayload
                    }
                }
            },
            select: {
                id: true,
                name: true,
                email: true,
                created_at: true,
                updated_at: true,
                profiles: true
            },
        });
        let resp = ResponseTemplate(users, 'update data success', null, 200);
        res.status(200).json(resp);
        return;
    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.status(500).json(resp);
        return;
    };
};

async function deleteUser(req, res) {
    const { id } = req.params;

    try {
        const findUser = await prisma.users.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!findUser) {
            let resp = ResponseTemplate(null, 'user not found', null, 404);
            res.status(404).json(resp);
            return;
        };

        const users = await prisma.users.delete({
            where: {
                id: Number(id)
            },
        });
        let resp = ResponseTemplate(users, 'delete data success', null, 200);
        res.status(200).json(resp);
        return;
    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        res.status(500).json(resp);
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