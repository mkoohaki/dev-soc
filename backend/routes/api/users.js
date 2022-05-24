const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User.model");

require("dotenv").config();

// @route   GET api/users
// @desc    Test route
// @access  Public
router.get("/", (req, res) => {
  res.send("User route");
});

// @route   POST api/users
// @desc    Test posting
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Include a valid email").isEmail(),
    check("password", "Enter a password with 6 or more charachter").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if use rexists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        // Picture details
        s: "200", // Size
        r: "pg", // Rating
        d: "mm", // Default / usre icon
      });

      // Encrypt password
      const randomSalt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, randomSalt);

      user = new User({
        name,
        email,
        avatar,
        randomSalt,
        hashedPassword,
      });

      await user.save();

      // Return jsonwebtoken
      // res.send("User registered!");
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.secret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
