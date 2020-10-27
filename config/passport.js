const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const User = require('../model/user')

module.exports = (passport) => {
    passport.use(new localStrategy({
        usernameField: 'email'
    },
    async (email, password, done) => {
        const user = await User.findOne({ email })
        if (!user)
            return done(null, false, { message: 'No Account found with that email' });
        
        
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                  return done(null, user);
                } else {
                  return done(null, false, { message: 'Password incorrect' });
                }
              });

    }))
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
    });
}