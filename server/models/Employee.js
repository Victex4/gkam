const mongoose = require("mongoose");

const EmployeeModel = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: String,
    referredBy: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationTokenExpires: { type: Date },
    // You have these, but ensure they are used consistently if you have other OTP fields
    // verifyOtp: { type: String, default: '' },
    // verifyOtpExpiredAt: { type: Number, default: 0 },
    // resetOtp: { type: String, default: '' },
    // resetOtpExpiredAt: { type: Number, default: 0 },
    resetPasswordToken: { type: String }, // Used for password reset OTP
    resetPasswordExpires: { type: Date }, // Used for password reset OTP
    role: { type: String, enum: ["user", "admin"], default: "user" }
}, { timestamps: true });

module.exports = mongoose.model("Employee", EmployeeModel); // Export your model
