import React, { useState } from "react";
import axios from "axios";
import SideBar from "../sideBar/SideBar";
import Top from "../header/Top";

const paymentOptions = [
  { label: "Korapay: Naira", currency: "NGN", gateway: "korapay" },
  { label: "Korapay: GHS", currency: "GHS", gateway: "korapay" },
  { label: "Korapay: KES", currency: "KES", gateway: "korapay" },
  { label: "Cryptomus", currency: "USDT", gateway: "cryptomus" },
  { label: "PayPal", currency: "USD", gateway: "paypal" },
];

const conversionRates = {
  GHS: 0.075,
  KES: 0.30,
  USD: 0.00085,
  USDT: 0.00085,
};

const AddFunds = ({ toggleSideBar, isSideBarOpen }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [amount, setAmount] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const publicKey = import.meta.env.VITE_PUBLIC_KEY;

  const apiBaseUrl = import.meta.env.VITE_API;

  const getConvertedAmount = () => {
    if (!amount || !selectedOption || selectedOption.currency === "NGN") return "";
    const rate = conversionRates[selectedOption.currency];
    return rate ? (amount * rate).toFixed(2) : "";
  };

  const payKorapay = () => {
    if (!selectedOption || !amount || !customerName || !customerEmail) {
      alert("Please fill all required fields.");
      return;
    }

    if (!publicKey || typeof publicKey !== "string") {
      alert("Missing Korapay Public Key");
      return;
    }

    const reference = `ref_${Date.now()}`;

    window.Korapay.initialize({
      key: publicKey,
      reference,
      amount: parseFloat(amount),
      currency: selectedOption.currency,
      customer: {
        name: customerName.trim(),
        email: customerEmail.trim(),
      },
      onClose: () => {
        alert("Payment closed.");
      },
      onSuccess: async (data) => {
        try {
          setLoading(true);
          const response = await axios.post(`${apiBaseUrl}/api/confirm-payment`, {
            reference: data.reference,
            name: customerName.trim(),
            email: customerEmail.trim(),
            amount: parseFloat(amount),
            currency: selectedOption.currency,
          });
          alert("✅ Payment confirmed successfully!");
        } catch (err) {
          console.error("❌ Confirmation error:", err.response?.data || err.message);
          alert(`Confirmation failed: ${err.response?.data?.message || err.message}`);
        } finally {
          setLoading(false);
        }
      },
      onFailed: (data) => {
        console.warn("❌ Payment failed:", data);
        alert("Payment failed.");
      },
    });
  };

  return (
    <div>
      <Top toggleSideBar={toggleSideBar} />
      <SideBar isSideBarOpen={isSideBarOpen} />

      <div className="p-4 max-w-md mx-auto mt-[8rem] font-serif bg-white shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Add Funds</h2>

        <label className="block mb-2 font-semibold">Select Payment Method</label>
        <div className="space-y-2 mb-4">
          {paymentOptions.map((option, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value={option.label}
                checked={selectedOption?.label === option.label}
                onChange={() => setSelectedOption(option)}
              />
              {option.label}
            </label>
          ))}
        </div>

        <label className="block mb-1">Amount (₦)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount in Naira"
          className="w-full border px-3 py-2 rounded mb-3"
        />

        <label className="block mb-1">Name</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Full name"
          className="w-full border px-3 py-2 rounded mb-3"
        />

        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          placeholder="Email address"
          className="w-full border px-3 py-2 rounded mb-3"
        />

        {selectedOption && selectedOption.currency !== "NGN" && (
          <div className="mt-2">
            <label className="block mb-1">
              Converted Amount ({selectedOption.currency})
            </label>
            <input
              type="text"
              readOnly
              value={`${getConvertedAmount()} ${selectedOption.currency}`}
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>
        )}

        <button
          onClick={payKorapay}
          disabled={!selectedOption || selectedOption.gateway !== "korapay" || loading}
          className={`mt-6 ${
            !selectedOption || selectedOption.gateway !== "korapay"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-pink-500 hover:bg-pink-600"
          } text-white px-4 py-2 rounded w-full`}
        >
          {loading ? "Confirming..." : "Proceed To Payment"}
        </button>
      </div>
    </div>
  );
};

export default AddFunds;
