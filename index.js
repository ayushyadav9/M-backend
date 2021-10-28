const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
require('./config/db');

const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
  }) 

app.use('/', require('./api/routes'));





app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// error handler middleware
app.use((error, req, res) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        },
    });
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

