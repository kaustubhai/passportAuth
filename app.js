const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const flash = require('connect-flash')
const session = require('express-session')
require('dotenv').config()
const passport = require('passport')
var mongoose = require('mongoose');

const app = express();

require('./config/passport')(passport)

//DB keys
const mongoDB = require('./config/keys').MongoURI;

//Set up default mongoose connection
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch((error) => console.log(error))

//View-Engine
app.use(expressLayouts)
app.set('view engine', 'ejs')
    
//Request Body-parser
app.use(express.urlencoded({ extended: false }))


// Express-Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
  
// Connect-Flash
app.use(flash())

//Global variables
app.use((req, res, next) => {
    res.locals.successRegister = req.flash('successRegister')
    res.locals.errorRegister = req.flash('errorRegister')
    res.locals.errorSignin = req.flash('error')
    next();
})

//Routers
app.use('/', require('./router/index'))
app.use('/users', require('./router/users'))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server started on port ${PORT}`))