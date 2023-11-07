const { PrismaClient } = require('@prisma/client');
const { ResponseTemplate } = require('../helper/helper');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { name, email, password, identity_type, identity_number, address } = req.body;
        
        const existUser = await prisma.users.findUnique({ where: { email } });
        if (existUser) {
            let resp = ResponseTemplate(null, 'bad request', 'email already used!', 400);
            return res.status(400).json(resp);
        };

        const encryptedPass = await bcrypt.hash(password, 10);
        const user = await prisma.users.create({
            data: {
                name: name,
                email: email,
                password: encryptedPass,
                profiles: {
                    create: {
                        identity_type: identity_type,
                        identity_number: identity_number,
                        address: address
                    }
                }
            }
        });
        let resp = ResponseTemplate(user, 'input data success', null, 201);
        return res.status(201).json(resp);
    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', null, 500);
        return res.status(500).json(resp);
    };
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.users.findUnique({ where: { email: email } });
        if (!user) {
            let resp = ResponseTemplate(null, 'bad request', 'invalid email or password!', 400);
            return res.status(400).json(resp);
        };

        const isPassTrue = await bcrypt.compare(password, user.password);
        if (!isPassTrue) {
            let resp = ResponseTemplate(null, 'bad request', 'invalid email or password!', 400);
            return res.status(400).json(resp);
        };

        let token = jwt.sign({ email: user.email, user_id: user.user_id }, process.env.SECRET_KEY);
        let resp = ResponseTemplate({ user, token }, 'created', null, 200);
        return res.status(200).json(resp);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login
}