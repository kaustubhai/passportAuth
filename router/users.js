const express = require('express')

const Router = express.Router();

Router.get('/login', (req, res) => {
    res.render('login')
})

Router.get('/register', (req, res) => {
    res.render('register')
})

module.exports = Router