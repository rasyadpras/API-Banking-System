const Joi = require('joi');
const { ResponseTemplate } = require('../helper/helper')

function checkPostUser(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,30}$')).required(),
        identity_type: Joi.string().required(),
        identity_number: Joi.string().required(),
        address: Joi.string().required()
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

function checkPostTransaction(req, res, next) {
    const schema = Joi.object({
        amount: Joi.number().precision(2).required(),
        source_account_id: Joi.number().required(),
        destination_account_id: Joi.number().required()
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
    checkPostAccount,
    checkPostTransaction
}