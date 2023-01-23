const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT 
const passport = require('passport')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')
import multer from 'multer'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
//Connecting to DB
const connectDB = require('./config/db')

/* Configuration */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors())
app.use('')


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