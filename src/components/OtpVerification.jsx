import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Import axios for API calls

// OTP Verification Component
function OtpVerification({ email, onVerificationComplete }) {
    // State to hold each digit of the OTP
    const [otpDigits, setOtpDigits] = useState(Array(6).fill(''));
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Refs for each input box to manage focus
    const inputRefs = useRef([]);

    // Focus on the first input box when the component mounts
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    // Handle input change for each digit box
    const handleChange = (e, index) => {
        const { value } = e.target;

        // Only allow a single digit
        if (value.length > 1) return;

        // Only allow numbers
        if (value && !/^\d$/.test(value)) return;

        const newOtpDigits = [...otpDigits];
        newOtpDigits[index] = value;
        setOtpDigits(newOtpDigits);

        // Move focus to the next input box if a digit is entered
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    // Handle backspace key press
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
            // If current box is empty and backspace is pressed, move to previous box
            inputRefs.current[index - 1].focus();
        }
    };

    // Handle paste event
    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').trim();
        if (pasteData.length === 6 && /^\d+$/.test(pasteData)) {
            const newOtpDigits = pasteData.split('');
            setOtpDigits(newOtpDigits);
            // Move focus to the last input box after pasting
            if (inputRefs.current[5]) {
                inputRefs.current[5].focus();
            }
        } else {
            setMessage('Please paste a valid 6-digit OTP.');
        }
    };

    const handleVerifyOtp = async () => {
        setMessage(''); // Clear previous messages
        setIsLoading(true);

        const fullOtp = otpDigits.join(''); // Join all digits to form the complete OTP

        if (fullOtp.length !== 6) {
            setMessage('Please enter the complete 6-digit OTP.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/auth/verify-otp', { // Your backend verification endpoint
                email,
                otp: fullOtp, // Send email and the joined OTP
            });

            if (response.status === 200) {
                setMessage(response.data.message);
                // Call the callback function provided by the parent (Register component)
                if (onVerificationComplete) {
                    onVerificationComplete();
                }
            } else {
                setMessage(`Error: ${response.data.message}`);
            }
        } catch (error) {
            const msg = error.response?.data?.message || 'Network error. Please try again.';
            setMessage(`Error: ${msg}`);
            console.error('OTP verification error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
                Verify Your Account
            </h2>
            <p className="text-center text-gray-600 mb-4">
                An OTP has been sent to <span className="font-semibold text-blue-600">{email}</span>.
                Please enter it below to verify your account.
            </p>

            {/* OTP Input Boxes */}
            <div className="flex justify-center space-x-2 mb-6" onPaste={handlePaste}>
                {otpDigits.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => (inputRefs.current[index] = el)} // Assign ref to each input
                        className="w-12 h-12 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        aria-label={`OTP digit ${index + 1}`}
                    />
                ))}
            </div>

            <button
                onClick={handleVerifyOtp}
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 text-lg font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
            {message && (
                <p className={`mt-4 text-center text-sm font-medium ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                    {message}
                </p>
            )}
        </div>
    );
}

export default OtpVerification;
