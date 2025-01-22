const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();
const bodyParser = require('body-parser');

const DB_URI = process.env.DB_URI

try {
    mongoose.connect(DB_URI).then(() => {
        console.log("connected to db")
    })
} catch (error) {
    console.log(error)
}

// db connection
mongoose.set('strictQuery', false)

// middleware
app.use(cors({
    origin: ["http://localhost:5174", "https://pharmacia.onrender.com", "https://pharmacia.vercel.app"],
    credentials: 'true',
}))
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}))

// routes
// app.use("/auth", authRouter)

// authentication
// app.post("/login", loginUser, (req, res) => {
//     res.redirect("/secret")
// })

// running the server
app.listen(5005, () => {
    console.log("server running on port 5005")
})