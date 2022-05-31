const express = require("express");
const connectDB = require("./config/db");
const config = require("config");

const app = express();

app.use(express.json({ estended: false }));
//Connect database
connectDB();

// require("dotenv").config();
app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.port || 8000;
//const PORT = config.get("port");

//Define Routes
const usersRoute = require("./routes/api/users");
const authRoute = require("./routes/api/auth");
const postsRoute = require("./routes/api/posts");
const profileRoute = require("./routes/api/profile");

app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
app.use("/api/profile", profileRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
