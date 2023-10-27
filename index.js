const express = require('express');
const router = require('./routes/route');
const app = express();

require('dotenv').config()
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello!'));

app.use(router)

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));