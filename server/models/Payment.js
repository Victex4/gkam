const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  amount: { type: String },
  reference: { type: String },
  status: { type: String },
}, { timestamps: true });

const Payment = mongoose.model("paymentProof", paymentSchema);
module.exports = Payment;
