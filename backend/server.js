const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT 
const mongoose = require('mongoose')
const session = require('express-session')
const connectDB = require('./config/db')
const app = express();

connectDB();

app.use(express.json())
app.use(express.urlencoded())


app.use(session({
    secret: 'abc123',
    resave: false,
    saveUninitialized: false,
}))

app.use('/api/user', require('./routes/auth'))


app.listen(port, () => console.log(`Server started on port: ${port}`))