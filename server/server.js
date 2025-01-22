const express = require('express');
const app = express();

port = 5000 || process.env.PORT;

app.get("/product/add", (req, res) => {
    res.send("everything is working perfectly.")
} )

app.listen(port, () => {
    console.log("server is running on port:", port)
})