const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT 
const passport = require('passport')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const connectDB = require('./config/db')
const app = express();
require('./strategies/local')

connectDB();

app.use(express.json())
app.use(express.urlencoded())


app.use(cookieParser())
app.use(session({
    secret: 'abc123',
    resave: false,
    saveUninitialized: false,
}))


app.use(passport.initialize())
app.use(passport.session())

app.use('/api/user', require('./routes/auth'))
app.use('/api/items', require('./routes/example'))


app.listen(port, () => console.log(`Server started on port: ${port}`))