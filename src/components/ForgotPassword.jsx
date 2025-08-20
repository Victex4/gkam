import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Using axios for consistency
import Alert from '../components/Alert.jsx'; // Assuming this is your custom Alert component
import OtpVerify from '../components/OtpVerify.jsx'; // Import the renamed OTP component

// import ForgotPassPopUp from '../components/ForgotPassPopUp'; // This component might not be needed anymore if using OTP flow directly

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [alertType, setAlertType] = useState('');
    const [msg, setMsg] = useState('');
    // const [forgotPassPopUp, setForgotPassPopUp] = useState(false); // No longer needed for OTP flow
    // const [showCheckEmailModal, setShowCheckEmailModal] = useState(false); // No longer needed for OTP flow

    // New state for OTP verification step
    const [showOtpInputForReset, setShowOtpInputForReset] = useState(false);
    const [resetEmail, setResetEmail] = useState(''); // To hold email for OTP verification
    // const [verifiedOtpForReset, setVerifiedOtpForReset] = useState(''); // This will be passed directly in navigate state

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setMsg(''); // Clear previous messages
        setAlertType('');

        if (!email) {
            setMsg('Please enter your email.');
            setAlertType('error');
            return;
        }

        try {
            // Send request to backend to send OTP for password reset
            const res = await axios.post(`http://localhost:3001/api/auth/forgot-password`, {
                email,
            });

            // Backend returns 200 even if email not found for security
            setMsg(res.data.message);
            setAlertType('success');

            // If the request was successful, prepare to show OTP input
            setResetEmail(email); // Store email to pass to OtpVerify component
            setShowOtpInputForReset(true); // Show the OTP input component

        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Something went wrong. Please try again.';
            setMsg(errorMessage);
            setAlertType('error');
            console.error("Forgot password request error:", err);
        }
    }

    // Callback when OTP for password reset is successfully verified by OtpVerify component
    const handleResetOtpVerificationSuccess = (emailFromOtpVerify, otpFromOtpVerify) => {
        setMsg('OTP verified successfully. Redirecting to set new password...');
        setAlertType('success');

        // Navigate to the new password setting page, passing email and OTP via state
        navigate('/set-new-password', { state: { email: emailFromOtpVerify, otp: otpFromOtpVerify } });
    };

    return (
        <div>
            <div className="flex justify-center min-h-[100vh] items-center bg-white">
                <form onSubmit={handleSubmit} className="w-[350px] md:w-[450px] shadow-md bg-[#FFE9FE] rounded-[12px] py-[30px] px-[40px]">
                    <div className="flex justify-center ">
                        <img src="/logo.svg" className="w-16" alt="Logo" />
                    </div>
                    <div className="text-2xl font-Poppins py-4 font-bold text-black flex justify-center">
                        Recover Your Account
                    </div>

                    {msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType} />}

                    {!showOtpInputForReset ? (
                        // Render the email input form initially
                        <>
                            <div>
                                <h1 className="text-[18px] font-Poppins text-center text-2xl font-bold">
                                    Forgot Password?
                                </h1>
                                <p className="font-Poppins pt-1 pb-[2rem] text-center text-sm text-gray-400">
                                    Fill in your email to receive an OTP
                                </p>
                            </div>
                            <label className="block">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    className="block w-full text-sm bg-white rounded-[6px] border text-black py-2 px-4 focus:outline-none focus:border-[#28a745]"
                                />
                            </label>
                            <button
                                type="submit"
                                className={`w-full py-[10px] rounded-[50px] mb-5 mt-[2rem] ${
                                    email
                                        ? 'bg-[#004FDA] text-white'
                                        : 'bg-[#FF01F7] text-white cursor-not-allowed'
                                }`}
                                disabled={!email}
                            >
                                Send OTP
                            </button>
                        </>
                    ) : (
                        // Render OtpVerify component once OTP is sent
                        <OtpVerify
                            email={resetEmail} // Pass the email entered by the user
                            verificationApiEndpoint="/api/auth/verify-reset-otp" // Specific endpoint for password reset OTP
                            onVerificationSuccess={handleResetOtpVerificationSuccess} // Callback for successful verification
                            title="Verify OTP for Password Reset"
                            messageIntro="An OTP for password reset has been sent to"
                        />
                    )}
                </form>
            </div>

            {/* The original ForgotPassPopUp and showCheckEmailModal are commented out or removed
                as the OTP flow replaces them. */}
            {/* <ForgotPassPopUp
                forgotPassPopUp={forgotPassPopUp}
                setForgotPassPopUp={handleForgotPassPopUpClose}
            />
            {showCheckEmailModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-[350px] text-center">
                        <h2 className="text-2xl font-bold mb-2">Check your email 📧</h2>
                        <p className="text-gray-600 mb-4">
                            We’ve sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions.
                        </p>
                        <button
                            onClick={() => setShowCheckEmailModal(false)}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Okay
                        </button>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default ForgotPassword;
