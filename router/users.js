const express = require('express')
const bcrypt = require('bcryptjs')

const Router = express.Router();

const Users = require('../model/user')

Router.get('/login', (req, res) => {
    res.render('login')
})

Router.get('/register', (req, res) => {
    res.render('register')
})

Router.post('/register', async (req, res) => {
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
    else {
        const user = await Users.findOne({ email })
        if (user)
            errors.push({ message: 'User already exists' })
    
        if (errors.length > 0) {
            res.render('register', {
                errors,
                name,
                email,
                password,
                password2
            })
        }
        else {
            const newUser = new Users({
                name,
                email,
                password
            })

            const hash = await bcrypt.hash(password, 8)
            newUser.password = hash

            const saved = await newUser.save()
            if (saved)
                res.send(saved)
            else
                res.send('Passed')
        }
    }
})

module.exports = Router