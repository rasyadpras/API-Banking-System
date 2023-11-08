const request = require('supertest');
const app = require('../index');

describe('user test', () => {
    it('get all user data', async () => {
        try {
            const resp = await request(app).get('/api/v1/users');
            expect(resp.statusCode).toBe(200);
            expect(resp.body.data).toBeTruthy();
            expect(resp.body).toHaveProperty('message');
            expect(resp.body).toHaveProperty('status');
            expect(resp.body.status).toEqual(200);
            expect(resp.body.message).toEqual('get data success'); 
        } catch (error) {};
    });

    it('get user data by id', async () => {
        try {
            const id = 1;
            const resp = await request(app).get(`/api/v1/users/${id}`);
            expect(resp.statusCode).toBe(200);
            expect(resp.body.data).toBeTruthy();
            expect(resp.body).toHaveProperty('message');
            expect(resp.body).toHaveProperty('status');
            expect(resp.body.status).toEqual(200);
            expect(resp.body.message).toEqual('get data success');
        } catch (error) {};
    });

    it('add new user', async () => {
        try {
            const testUser = {
                name: "Test",
                email: "testing@mail.com",
                password: "password12345",
                identity_type: "Identity card",
                identity_number: "012345678",
                address: "Anywhere"
            };
            const resp = await request(app).post('/api/v1/users').send(testUser);
            expect(resp.statusCode).toBe(201);
            expect(resp.body.data).toBeTruthy();
            expect(resp.body).toHaveProperty('message');
            expect(resp.body).toHaveProperty('status');
            expect(resp.body.status).toEqual(201);
            expect(resp.body.message).toEqual('input data success');
        } catch (error) {};
    });
});

describe('account test', () => {
    it('get all user account', async () => {
        try {
            const resp = await request(app).get('/api/v1/accounts');
            expect(resp.statusCode).toBe(200);
            expect(resp.body.data).toBeTruthy();
            expect(resp.body).toHaveProperty('message');
            expect(resp.body).toHaveProperty('status');
            expect(resp.body.status).toEqual(200);
            expect(resp.body.message).toEqual('get data success');
        } catch (error) {}
    });

    it('get user account by id', async () => {
        try {
            const id = 1;
            const resp = await request(app).get(`/api/v1/accounts/${id}`);
            expect(resp.statusCode).toBe(200);
            expect(resp.body.data).toBeTruthy();
            expect(resp.body).toHaveProperty('message');
            expect(resp.body).toHaveProperty('status');
            expect(resp.body.status).toEqual(200);
            expect(resp.body.message).toEqual('get data success');
        } catch (error) {}
    });

    it('add new account', async () => {
        try {
            const testAccount = {
                user_id: 1,
                bank_name: 'Example Bank',
                bank_account_number: 1101,
                balance: 10000
            };
            const resp = await request(app).post('/api/v1/accounts').send(testAccount);
            expect(resp.statusCode).toBe(201);
            expect(resp.body.data).toBeTruthy();
            expect(resp.body).toHaveProperty('message');
            expect(resp.body).toHaveProperty('status');
            expect(resp.body.status).toEqual(201);
            expect(resp.body.message).toEqual('input data success');
        } catch (error) {}
    });
});

describe('transaction test', () => {
    it('get all transaction data', async () => {
        try {
            const resp = await request(app).get('/api/v1/transactions');
            expect(resp.statusCode).toBe(200);
            expect(resp.body.data).toBeTruthy();
            expect(resp.body).toHaveProperty('message');
            expect(resp.body).toHaveProperty('status');
            expect(resp.body.status).toEqual(200);
            expect(resp.body.message).toEqual('get data success');
        } catch (error) {}
    });

    it('get transaction data by id', async () => {
        try {
            const id = 1;
            const resp = await request(app).get(`/api/v1/transactions/${id}`);
            expect(resp.statusCode).toBe(200);
            expect(resp.body.data).toBeTruthy();
            expect(resp.body).toHaveProperty('message');
            expect(resp.body).toHaveProperty('status');
            expect(resp.body.status).toEqual(200);
            expect(resp.body.message).toEqual('get data success');
        } catch (error) {}
    });

    it('add new transaction', async () => {
        try {
            const testTransaction = {
                source_account_id: 1,
                destination_account_id: 2,
                amount: 1000
            };
            const resp = await request(app).post('/api/v1/transactions').send(testTransaction);
            expect(resp.statusCode).toBe(201);
            expect(resp.body.data).toBeTruthy();
            expect(resp.body).toHaveProperty('message');
            expect(resp.body).toHaveProperty('status');
            expect(resp.body.status).toEqual(201);
            expect(resp.body.message).toEqual('input data success');
        } catch (error) {}
    });
});