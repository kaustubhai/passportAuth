const express = require('express')

const Router = express.Router();

Router.get('/login', (req, res) => {
    res.render('login')
})

Router.get('/register', (req, res) => {
    res.render('register')
})

Router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body
    
    let errors = []
    if (!name || !email || !password || !password2)
        errors.push({ message: 'Please fill in all fields' })
    if (password2 !== password)
        errors.push({ message: 'Passwords dont Match' })
    if (password.length < 6)
        errors.push({ message: 'Passwords length should be more than 6 characters' })
    
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    }
    else
        res.send('Passed')
})

module.exports = Router