const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", default: null },
}, { timestamps: true });

module.exports = mongoose.model("Employee", EmployeeSchema);
