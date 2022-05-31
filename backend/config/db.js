const mongoose = require("mongoose");
const config = require("config");
require("dotenv").config();

// const URI = process.env.uri;
const URI = config.get("uri");

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
    });
    console.log("MongoDB database connection established successfully");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
