const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { verifyJWT } = require("../middleware/verifyJWT");
const User = require("../models/User.js");

router.post("/register-admin", verifyJWT, async (req, res) => {
  try {
    const { username, password, name } = req.body;

    let { email } = req.body;

    email = email.toLowerCase();
    // Check if email already exists
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this username" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      name,
    });

    await newUser.save();

    res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
