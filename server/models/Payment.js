// Example Payment schema (models/Payment.js)
const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  amount: Number,
  status: String,
  link: String,
  service: String,
  quantity: Number,
  startCount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", PaymentSchema);
