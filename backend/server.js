const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT;

const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");
const cors = require("cors");

//Connecting to DB
const connectDB = require("./config/db");

connectDB();

require("./model/user");

const app = express();

const verifyJWT = require("./middleware/verifyJWT");

app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//routes
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));



app.use("/accommodation", require("./routes/accommodation"));


app.use("/foodservice", require("./routes/foodservice"));
app.use("/accbyId", require("./routes/getAccoById"));
// app.use('/foodservice', require('./routes/foodservice'))
app.use("/rooms", require("./routes/rooms"));
app.use("/service", require("./routes/service"));
app.use("/profile", verifyJWT, require("./routes/getuserprofile"));
app.use("/users", require("./routes/users"));
app.use("/users/check-auth", require("./routes/users"));
app.use("/roombookings", require("./routes/roomBooking"));
app.use("/servicebookings", require("./routes/serviceBooking"));
app.use("/review", require("./routes/review"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => console.log(`Server started on port: ${port}`));
