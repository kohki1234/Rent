const express = require('express');

const router = express.Router();

router.post('/signup',(req, res, next)=> {
    res.status(200).json(
        {message: 'response from NodeJS'}
        );
});

module.exports = router;