const request = require('supertest');
const app = require('../index');

describe('GET /api/v1/users', () => {
    it('get all user data', async () => {
        request(app)
            .get('/api/v1/users')
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('data');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('status');
                expect(res.body.status).toEqual(200);
                expect(res.body.message).toEqual('get data success');
            })
        done();
    })
});

describe('GET /api/v1/accounts', () => {
    test('return 200', done => {
        request(app)
            .get('/api/v1/accounts')
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('data');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('status');
                expect(res.body.status).toEqual(200);
                expect(res.body.message).toEqual('get data success');
            })
        done();
    })
});

describe('GET /api/v1/transactions', () => {
    test('return 200', done => {
        request(app)
            .get('/api/v1/transactions')
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('data');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('status');
                expect(res.body.status).toEqual(200);
                expect(res.body.message).toEqual('get data success');
            })
        done();
    })
});