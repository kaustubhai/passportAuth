module.exports = {
    auth: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }
        req.flash('errorRegister', 'Please login to visit dashboard')
        res.redirect('/users/login')
    }
}