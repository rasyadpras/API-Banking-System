const request = require('supertest');
const app = require('../index');

describe('user test', () => {
    it('get all user data', async () => {
        const resp = await request(app).get('/api/v1/users');
        expect(resp.statusCode).toBe(200);
        expect(resp.body.data).toBeTruthy();
        expect(resp.body).toHaveProperty('message');
        expect(resp.body).toHaveProperty('status');
        expect(resp.body.status).toEqual(200);
        expect(resp.body.message).toEqual('get data success');
    });
});

describe('account test', () => {
    it('get all user account', async () => {
        const resp = await request(app).get('/api/v1/accounts');
        expect(resp.statusCode).toBe(200);
        expect(resp.body.data).toBeTruthy();
        expect(resp.body).toHaveProperty('message');
        expect(resp.body).toHaveProperty('status');
        expect(resp.body.status).toEqual(200);
        expect(resp.body.message).toEqual('get data success');
    });
});

describe('transaction test', () => {
    it('get all transaction data', async () => {
        const resp = await request(app).get('/api/v1/transactions');
        expect(resp.statusCode).toBe(200);
        expect(resp.body.data).toBeTruthy();
        expect(resp.body).toHaveProperty('message');
        expect(resp.body).toHaveProperty('status');
        expect(resp.body.status).toEqual(200);
        expect(resp.body.message).toEqual('get data success');
    });
});