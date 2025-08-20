// =================== IMPORTS ===================
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
// 💡 IMPORTANT: Use a separate Admin model for security and clarity.
const AdminModel = require("../models/Admin");

// =================== ADMIN SIGNUP ROUTE ===================

/**
 * @route POST /api/admin/signup
 * @desc Create a new admin account
 * @access Public (with secret code)
 */
router.post("/signup", async (req, res) => {
    const { userName, email, password, confirmPassword, secretCode } = req.body;

    // ✅ Basic input validation
    if (!userName || !email || !password || !confirmPassword || !secretCode) {
        return res.status(400).json({ message: "All fields are required." });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
    }

    // ✅ Validate the secret code to prevent unauthorized admin creation
    if (secretCode !== process.env.ADMIN_SECRET_CODE) {
        return res.status(403).json({ message: "Invalid admin secret code." });
    }

    try {
        // Check if an admin with that email already exists
        const existingAdmin = await AdminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(409).json({ message: "Admin email already exists." });
        }

        // Hash the password securely
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new admin account in its own dedicated collection
        const newAdmin = new AdminModel({
            userName,
            email,
            password: hashedPassword,
            // 💡 No need for `role: "admin"` as they are already in the Admin collection
            // isVerified: true, // You can decide to auto-verify admins
        });

        await newAdmin.save();

        res.status(201).json({ message: "Admin account created successfully." });
    } catch (err) {
        console.error("❌ Admin signup error:", err);
        res.status(500).json({ message: "Server error during admin signup." });
    }
});

// =================== EXPORT ROUTER ===================
module.exports = router;
