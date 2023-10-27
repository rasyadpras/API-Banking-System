const Joi = require('joi');
const { ResponseTemplate } = require('../helper/helper')

function checkPostUser(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        let resp = ResponseTemplate(null, 'invalid request',
            error.details[0].message, 400)
        res.json(resp)
        return;
    };
    next();
};

function checkPostAccount(req, res, next) {
    const schema = Joi.object({
        user_id: Joi.number().required(),
        bank_name: Joi.string().required(),
        bank_account_number: Joi.number().required(),
        balance: Joi.number().precision(2).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        let resp = ResponseTemplate(null, 'invalid request',
            error.details[0].message, 400)
        res.json(resp)
        return;
    };
    next();
};

module.exports = {
    checkPostUser,
    checkPostAccount
}