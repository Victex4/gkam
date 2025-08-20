// =================== IMPORTS ===================
const express = require("express");
const router = express.Router();
const EmployeeModel = require("../models/Employee");
const { protect } = require("../middleware/authMiddleware");

// =================== REFERRAL ROUTES ===================

/**
 * @route GET /api/referrals
 * @desc Get referral details for the authenticated user
 * @access Private
 */
router.get("/", protect, async (req, res) => {
    try {
        // The `protect` middleware adds the user object to the request.
        // We use req.user.id to find referrals.
        const referrals = await EmployeeModel.find({ referredBy: req.user.id });

        // Calculate reward based on number of referrals
        const totalReward = referrals.length * 500;
        // The condition for 'available' seems to be a hardcoded rule.
        // It's better to calculate this on the fly based on the business logic.
        const available = totalReward >= 5000 ? 500 : 0;
        const registrationCount = referrals.length;

        res.status(200).json({
            referrals,
            totalReward,
            available,
            registrationCount,
        });
    } catch (err) {
        console.error("Error fetching referrals:", err);
        res.status(500).json({ message: "Server error fetching referrals." });
    }
});

/**
 * @route GET /api/referrals/link
 * @desc Get the referral link for the authenticated user
 * @access Private
 */
router.get("/link", protect, (req, res) => {
    // Construct the referral link using the user's ID
    const userId = req.user.id;
    const referralLink = `${process.env.VITE_FRONTEND_URL}/signup?ref=${userId}`;
    res.status(200).json({ referralLink });
});

// =================== EXPORT ROUTER ===================
module.exports = router;
