const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT 
const passport = require('passport')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')

//Connecting to DB
const connectDB = require('./config/db')




const app = express();
require('./strategies/local')
require('./model/user')
require('./config/passport') (passport);
connectDB();








app.use(cookieParser())

//Only for local strategy
// app.use(session({
//     secret: 'abc123',
//     resave: false,
//     saveUninitialized: false,
// }))


app.use(passport.initialize())
// app.use(passport.session()) //Local strategy

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/api/user', require('./routes/auth'))
app.use('/api/items', require('./routes/example'))


app.listen(port, () => console.log(`Server started on port: ${port}`))