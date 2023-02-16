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
const bcrypt = require('bcrypt');



const app = express();

require('./model/user')
// require('./config/passport');
connectDB();








app.use(cookieParser())




app.use(passport.initialize())
// app.use(passport.session()) //Local strategy

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

//routes
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
// app.use('/refresh', require('./routes/refresh'));
// app.use('/logout', require('./routes/logout'));
app.use('/hotels', require('./routes/hotels'));
app.use('/rooms', require('./routes/rooms'));
app.use('/users', require('./routes/users'));


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

// app.get('/protected', passport.authenticate('jwt', {session: false}), (req,res) => {
//     return res.status(200).send({
//         success: true,
        
//         user: {
//             id: req.user._id,
//             email: req.user.email
//         }
//     })
// })

app.listen(port, () => console.log(`Server started on port: ${port}`))