const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();
const bodyParser = require('body-parser');

const DB_URI = process.env.DB_URI
const DB_LOCAL = process.env.DB_LOCAL

const authRouter = require("./routes/user.route")
const inventoryRouter = require("./routes/inventory.route")
const orderRouter = require("./routes/order.route")
const salesRouter = require("./routes/sales.route")
const SupplierRouter = require("./routes/supplier.route")

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

connectDB(); // Call the function


// try {
//     mongoose.connect("mongodb://localhost:27017/").then(() => {
//         console.log("connected to db")
//     })
// } catch (error) {
//     console.log(error)
// }

// // db connection
// mongoose.set('strictQuery', false)

// middleware
app.use(cors({
    // origin: ["http://localhost:5173", "https://pharmacia.onrender.com", "https://pharmacia.vercel.app", "https://pharmaco-alpha.vercel.app/"],
    origin: "*",
    credentials: 'true',
}))
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

// routes
app.use("/auth", authRouter)
app.use("/inventory", inventoryRouter)
app.use('/orders', orderRouter);
app.use('/sales', salesRouter);
app.use('/supplier', SupplierRouter);

app.get("/test", (req, res) => {
    res.send("server is working")
    console.log("test is working!!")
})
// running the server
app.listen(5005, () => {
    console.log("server running on port 5005")
})

process.stdin.resume(); // Keeps the process open