import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Assuming these paths are correct in your project structure
import Top from "../header/Top";
import SideBar from "../sideBar/SideBar";

// Define payment options and conversion rates
const paymentOptions = [
    { label: "Korapay: Naira", currency: "NGN", gateway: "korapay" },
    { label: "Korapay: GHS", currency: "GHS", gateway: "korapay" },
    { label: "Korapay: KES", currency: "KES", gateway: "korapay" },
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
    const [loading, setLoading] = useState(false);

    // Ensure these environment variables are set in your .env file
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;
    const apiBaseUrl = import.meta.env.VITE_API || 'http://localhost:3001';

    // Function to calculate converted amount based on selected currency
    const getConvertedAmount = () => {
        if (!amount || !selectedOption || selectedOption.currency === "NGN") return "";
        const rate = conversionRates[selectedOption.currency];
        return rate ? (parseFloat(amount) * rate).toFixed(2) : "";
    };

    // Handle payment initiation for different gateways
    const handlePayment = async () => {
        if (!selectedOption || !amount) {
            toast.error("Please select a payment method and enter an amount.");
            return;
        }
        if (parseFloat(amount) <= 0) {
            toast.error("Amount must be greater than zero.");
            return;
        }

        setLoading(true);

        try {
            if (selectedOption.gateway === "korapay") {
                if (!publicKey || typeof publicKey !== "string") {
                    toast.error("Missing Korapay Public Key. Please check your environment variables.");
                    setLoading(false);
                    return;
                }

                const reference = `ref_${Date.now()}`;

                // Korapay initialization logic with a placeholder customer object
                window.Korapay.initialize({
                    key: publicKey,
                    reference,
                    amount: parseFloat(amount),
                    currency: selectedOption.currency,
                    // The customer object is now included with placeholder data
                    customer: {
                        name: "Payment Customer", // Placeholder name
                        email: "customer@example.com", // Placeholder email
                    },
                    onClose: () => {
                        toast.info("Payment window closed.");
                        setLoading(false);
                    },
                    onSuccess: async (data) => {
                        try {
                            const response = await axios.post(`${apiBaseUrl}/api/confirm-payment`, {
                                reference: data.reference,
                                amount: parseFloat(amount),
                                currency: selectedOption.currency,
                                transactionId: data.transactionId,
                                status: data.status
                            });
                            toast.success("✅ Payment confirmed successfully!");
                            // Optionally clear form or redirect
                        } catch (err) {
                            console.error("❌ Korapay confirmation error:", err.response?.data || err.message);
                            toast.error(`Confirmation failed: ${err.response?.data?.message || err.message}`);
                        } finally {
                            setLoading(false);
                        }
                    },
                    onFailed: (data) => {
                        console.warn("❌ Korapay payment failed:", data);
                        toast.error("Payment failed. Please try again.");
                        setLoading(false);
                    },
                });
            } else if (selectedOption.gateway === "paypal") {
                const response = await axios.post(`${apiBaseUrl}/api/paypal-payment`, {
                    amount: parseFloat(amount),
                    currency: selectedOption.currency,
                });
                toast.success(response.data.message || "PayPal payment initiated. Redirecting...");
                if (response.data.approvalUrl) {
                    window.location.href = response.data.approvalUrl;
                }
            }
        } catch (err) {
            console.error("❌ Payment initiation error:", err.response?.data || err.message);
            toast.error(`Payment initiation failed: ${err.response?.data?.message || err.message}`);
        } finally {
            if (selectedOption.gateway !== "korapay") {
                setLoading(false);
            }
        }
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
                                className="form-radio h-4 w-4 text-pink-600 transition duration-150 ease-in-out"
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
                    className="w-full border px-3 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                    onClick={handlePayment}
                    disabled={!selectedOption || loading}
                    className={`mt-6 flex items-center justify-center ${
                        !selectedOption || loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-pink-500 hover:bg-pink-600"
                    } text-white px-4 py-2 rounded w-full transition duration-200`}
                >
                    {loading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        "Proceed To Payment"
                    )}
                </button>
            </div>
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default AddFunds;
