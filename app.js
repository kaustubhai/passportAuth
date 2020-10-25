const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const app = express();

//View-Engine
app.use(expressLayouts)
app.set('view engine', 'ejs')

//Routers
app.use('/', require('./router/index'))
app.use('/users', require('./router/users'))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server started on port ${PORT}`))