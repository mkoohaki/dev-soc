const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User.model");

// @route  GET api/auth
// @desc   Test route
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-hashedPassword");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server error");
  }
});

module.exports = router;
