const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.send('This is a response');
} );

module.exports = app;