const { PrismaClient } = require('@prisma/client');
const { ResponseTemplate } = require('../helper/helper');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

register: async (req, res, next) => {
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
                password: encryptedPass
            }
        });
        let resp = ResponseTemplate(user, 'input data success', null, 201);
        return res.status(201).json(resp);
    } catch (error) {
        next(error);
    };
};

login: async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.users.findUnique({ where: { email } });
        const isPassTrue = await bcrypt.compare(password, user.password);
        if (!user || !isPassTrue) {
            let resp = ResponseTemplate(null, 'bad request', 'invalid email or password!', 400);
            return res.status(400).json(resp);
        };

        let token = jwt.sign(user, JWT_SECRET_KEY);
        let resp = ResponseTemplate({ user, token }, 'created', null, 200);
        return res.status(200).json(resp);
    } catch (error) {
        next(error);
    }
}