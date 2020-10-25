const express = require('express')
const expressLayouts = require('express-ejs-layouts')
require('dotenv').config()

const app = express();

//DB keys
const mongoDB = require('./config/keys').MongoURI;

//setup mongo
var mongoose = require('mongoose');

//Set up default mongoose connection
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch((error) => console.log(error))
    
//Request Body-parser
app.use(express.urlencoded({ extended: false }))

//View-Engine
app.use(expressLayouts)
app.set('view engine', 'ejs')

//Routers
app.use('/', require('./router/index'))
app.use('/users', require('./router/users'))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server started on port ${PORT}`))