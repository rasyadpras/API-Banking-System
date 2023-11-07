const express = require('express');
const router = require('./routes/route');
const app = express();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
// const session = require('express-session');
// const flash = require('express-flash');

require('dotenv').config()
const port = process.env.PORT || 3000;

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Banking System API',
            version: '1.0.0',
            description: '',
        },
        servers: [{url: `http://localhost:${port}/api/v1`}],
    },
    apis: ['./routes/user.route.js', './routes/account.route.js', './routes/transaction.route.js'],
}
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/', router);
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

module.exports = app;