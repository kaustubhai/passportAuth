const express = require('express')
const bcrypt = require('bcryptjs')
const passport = require('passport')

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
                password,
            })

            const hash = await bcrypt.hash(password, 8)
            newUser.password = hash

            const saved = await newUser.save()
            if (saved) {
                req.flash('successRegister', 'You are now registered and can login')
                res.redirect('/users/login')
            }
            else
                res.send('Passed')
        }
    }
})

// Login
Router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
});
  
// Logout
Router.get('/logout', (req, res) => {
    req.logOut()
    req.flash('successRegister', 'You have succesfully logged out')
    res.redirect('/users/login')
})

module.exports = Router