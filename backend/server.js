const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT 
const passport = require('passport')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')


//Connecting to DB
const connectDB = require('./config/db')
const bcrypt = require('bcrypt');

connectDB();

require('./model/user')


const app = express();

const reqAuth = require('./middleware/reqAuth')








const protect = require('./middleware/authMiddleware')

const verifyJWT = require('./middleware/verifyJWT')

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: '*',
    credentials: true,
}))

//routes
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));

app.use('/location', require('./routes/location'))
app.use('/country', require('./routes/country'))
app.use('/hotels', require('./routes/hotels'));
app.use('/foodservice', require('./routes/foodservice'))
app.use('/rooms', require('./routes/rooms'));
app.use('/profile', verifyJWT, require('./routes/getuserprofile') )
app.use('/users',   require('./routes/users'));
app.use('/users/check-auth', require('./routes/users'));





app.listen(port, () => console.log(`Server started on port: ${port}`))