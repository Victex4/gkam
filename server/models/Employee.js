// models/Employee.js
const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  country: String,
  referredBy: { type: String, default: null },
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  verificationTokenExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  role: { type: String, enum: ["user", "admin"], default: "user" } // ✅
}, { timestamps: true });

module.exports = mongoose.model("Employee", EmployeeSchema);
