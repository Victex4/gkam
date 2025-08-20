import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Alert from '../components/Alert.jsx'; // Assuming this is your custom Alert component
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const SetNewPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [alertType, setAlertType] = useState('');
    const [msg, setMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    // Extract email and OTP from navigation state, which are passed from ForgotPassword.jsx
    const { email, otp } = location.state || {}; 

    useEffect(() => {
        // If email or OTP are missing from state, it means the user tried to access this page directly
        // without going through the forgot password and OTP verification flow.
        if (!email || !otp) {
            setMsg('Invalid access. Please start the password reset process again.');
            setAlertType('error');
            // Redirect to the forgot password page after a short delay
            setTimeout(() => navigate('/forgot-password'), 2000);
        }
    }, [email, otp, navigate]); // Dependencies for useEffect

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg(''); // Clear previous messages
        setAlertType('');
        setIsLoading(true); // Start loading

        // Client-side validation
        if (!newPassword || !confirmNewPassword) {
            setMsg('Please fill in all fields.');
            setAlertType('error');
            setIsLoading(false); // Stop loading
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setMsg('Passwords do not match.');
            setAlertType('error');
            setIsLoading(false); // Stop loading
            return;
        }

        if (newPassword.length < 6) { // Example password policy: minimum 6 characters
            setMsg('Password must be at least 6 characters long.');
            setAlertType('error');
            setIsLoading(false); // Stop loading
            return;
        }

        try {
            // Send the request to the backend to reset the password
            const res = await axios.post(`http://localhost:3001/api/auth/reset-password`, {
                email,
                otp, // Send the verified OTP again for final backend check
                newPassword,
            });

            if (res.status === 200) {
                setMsg(res.data.message || 'Your password has been reset successfully!');
                setAlertType('success');
                // Redirect to the login page after successful password reset
                setTimeout(() => navigate('/login'), 2000); 
            }
        } catch (err) {
            // Handle errors from the backend
            const errorMessage = err.response?.data?.message || 'Something went wrong. Please try again.';
            setMsg(errorMessage);
            setAlertType('error');
            console.error("Password reset error:", err);
        } finally {
            setIsLoading(false); // Always stop loading, regardless of success or failure
        }
    };

    return (
        <div className="flex justify-center min-h-[100vh] items-center bg-white">
            <form onSubmit={handleSubmit} className="w-[350px] md:w-[450px] shadow-md bg-[#FFE9FE] rounded-[12px] py-[30px] px-[40px]">
                <div className="flex justify-center ">
                    <img src="/logo.svg" className="w-16" alt="Logo" />
                </div>
                <div className="text-2xl font-Poppins py-4 font-bold text-black flex justify-center">
                    Set New Password
                </div>

                {/* Display alert messages */}
                {msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType} />}

                {/* Conditional rendering based on whether email and OTP are present in state */}
                {!email || !otp ? (
                    <p className="text-red-600 text-center">Loading or invalid access... Redirecting.</p>
                ) : (
                    <>
                        <div>
                            <h1 className="text-[18px] font-Poppins text-center text-2xl font-bold">
                                Enter New Password
                            </h1>
                            <p className="font-Poppins pt-1 pb-[2rem] text-center text-sm text-gray-400">
                                Please enter your new password.
                            </p>
                        </div>

                        {/* New Password Input */}
                        <div className="relative mb-4">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New Password"
                                className="block w-full text-sm bg-white rounded-[6px] border text-black py-2 px-4 focus:outline-none focus:border-[#28a745]"
                            />
                            <div className="absolute top-3 right-5 text-xl cursor-pointer">
                                {showPassword ? (
                                    <AiFillEye onClick={() => setShowPassword(false)} />
                                ) : (
                                    <AiFillEyeInvisible onClick={() => setShowPassword(true)} />
                                )}
                            </div>
                        </div>

                        {/* Confirm New Password Input */}
                        <div className="relative mb-4">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                placeholder="Confirm New Password"
                                className="block w-full text-sm bg-white rounded-[6px] border text-black py-2 px-4 focus:outline-none focus:border-[#28a745]"
                            />
                            <div className="absolute top-3 right-5 text-xl cursor-pointer">
                                {showConfirmPassword ? (
                                    <AiFillEye onClick={() => setShowConfirmPassword(false)} />
                                ) : (
                                    <AiFillEyeInvisible onClick={() => setShowConfirmPassword(true)} />
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !newPassword || !confirmNewPassword} // Disable if loading or fields are empty
                            className={`w-full py-[10px] rounded-[50px] mb-5 mt-[2rem] flex items-center justify-center ${ // Added flex, items-center, justify-center
                                (newPassword && confirmNewPassword) // Button style based on fields being filled
                                    ? 'bg-[#004FDA] text-white'
                                    : 'bg-[#FF01F7] text-white cursor-not-allowed'
                            }`}
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                'Reset Password'
                            )}
                        </button>
                    </>
                )}
            </form>
        </div>
    );
};

export default SetNewPassword;
