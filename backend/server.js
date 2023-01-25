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

const secretKey = process.env.JWT_SECRET;
//Connecting to DB
const connectDB = require('./config/db')




const app = express();
require('./strategies/local')
require('./model/user')
require('./config/passport');
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
app.get('/protected', passport.authenticate('jwt', {session: false}), (req,res) => {
    return res.status(200).send({
        success: true,
        
        user: {
            id: req.user._id,
            email: req.user.email
        }
    })
})

app.listen(port, () => console.log(`Server started on port: ${port}`))