
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /users - Create a new user
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required"
      });
    }

    const user = await User.create({ name, email });

    res.status(201).json({
      message: "User created successfully",
      user
    });
  } catch (error) {
    res.status(400).json({
      message: error.code === 11000
        ? "Email already exists"
        : error.message
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
