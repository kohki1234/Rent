const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const uri = 'mongodb+srv://ksato2:nRqZ5exf123@cluster0-lkstu.mongodb.net/test?retryWrites=true';


mongoose.connect(uri, {useNewUrlParser: true}).then(() => {
    console.log('Connected to MongoDB server...')
}).catch(err => console.log(err));

app.use(cors());
app.use(bodyparser.json());


const userRoutes = require('./user');
const adminRoutes = require('./admin');

app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;