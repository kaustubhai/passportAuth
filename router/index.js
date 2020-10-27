const express = require('express');
const { auth } = require('../config/auth')

const Router = express.Router();

Router.get('/', (req, res) => {
    res.render('welcome')
})

Router.get('/dashboard', auth, (req, res) => {
    res.render('dashboard', {
        name: req.user.name
    })
})

module.exports = Router