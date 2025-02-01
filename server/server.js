const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();
const bodyParser = require('body-parser');

const DB_URI = process.env.DB_URI

const authRouter = require("./routes/user.route")
const inventoryRouter = require("./routes/inventory.route")
const orderRouter = require("./routes/order.route")
const salesRouter = require("./routes/sales.route")

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
    origin: ["http://localhost:5173", "https://pharmacia.onrender.com", "https://pharmacia.vercel.app"],
    credentials: 'true',
}))
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

// routes
app.use("/auth", authRouter)
app.use("/inventory", inventoryRouter)
app.use('/orders', orderRouter);
app.use('/sales', salesRouter);

// running the server
app.listen(5005, () => {
    console.log("server running on port 5005")
})