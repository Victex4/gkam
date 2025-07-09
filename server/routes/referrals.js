// routes/referrals.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const EmployeeModel = require("../models/Employee");

// Auth middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
};

// GET /api/referrals
router.get("/", authenticate, async (req, res) => {
  try {
    const referrals = await EmployeeModel.find({ referredBy: req.userId });

    const totalReward = referrals.length * 500;
    const available = totalReward >= 5000 ? 500 : 0;
    const registrationCount = referrals.length;

    res.json({
      referrals,
      totalReward,
      available,
      registrationCount,
    });
  } catch (err) {
    console.error("Error fetching referrals:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
