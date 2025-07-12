// routes/adminAuth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const EmployeeModel = require("../models/Employee");

router.post("/signup", async (req, res) => {
  const { userName, email, password, confirmPassword, secretCode } = req.body;

  if (!userName || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  if (secretCode !== process.env.ADMIN_SECRET_CODE) {
    return res.status(403).json({ message: "Invalid admin secret code." });
  }

  try {
    const existingUser = await EmployeeModel.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "Email already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new EmployeeModel({
      userName,
      email,
      password: hashedPassword,
      role: "admin", // ✅ force admin
      isVerified: true, // optionally skip email verify for admin
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin account created successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
