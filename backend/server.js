const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Connect database
connectDB();

require("dotenv").config();
app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.port || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
