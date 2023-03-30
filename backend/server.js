const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT 

const cookieParser = require('cookie-parser')

const bodyParser = require('body-parser')
const cors = require('cors')



//Connecting to DB
const connectDB = require('./config/db')

connectDB();

require('./model/user')


const app = express();



const verifyJWT = require('./middleware/verifyJWT')

app.use(cookieParser())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
}))

//routes
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));

app.use('/country', require('./routes/country'))
app.use('/location', require('./routes/location'))
app.use('/accommodation', require('./routes/accommodation'));
// app.use('/foodservice', require('./routes/foodservice'))
app.use('/rooms', require('./routes/rooms'));
app.use('/profile', verifyJWT, require('./routes/getuserprofile') )
app.use('/users',   require('./routes/users'));
app.use('/users/check-auth', require('./routes/users'));






app.listen(port, () => console.log(`Server started on port: ${port}`))