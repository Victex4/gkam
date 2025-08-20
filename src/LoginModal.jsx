import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import AlertModal from './components/AlertModal.jsx'; // ✅ Confirm this path is correct
import OtpVerification from './components/OtpVerification.jsx'; // ✅ Confirm this path is correct

const Register = () => {
    // Original state variables for the registration form
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [country, setCountry] = useState("");
    const [countries, setCountries] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [open, setOpen] = useState(false); // For password visibility
    const [secondOpen, setSecondOpen] = useState(false); // For confirm password visibility

    // State for AlertModal and loading
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertType, setAlertType] = useState("error");
    const [alertMessage, setAlertMessage] = useState("");
    const [isSigningUp, setIsSigningUp] = useState(false);

    // New states for OTP verification flow
    const [showOtpVerification, setShowOtpVerification] = useState(false);
    const [registeredEmail, setRegisteredEmail] = useState('');

    // Admin-related states
    const [adminKey, setAdminKey] = useState("");
    const [showAdminKeyField, setShowAdminKeyField] = useState(false);

    const dropdownRef = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const referralId = queryParams.get('ref') || null;

    const isMatch = password && confirmPassword && password === confirmPassword;

    // A placeholder for a secret admin key.
    // NOTE: In a production app, this should NOT be hardcoded on the frontend.
    // The key should be checked on the backend for security.
    const SECRET_ADMIN_KEY = "supersecretadminpassword";

    useEffect(() => {
        const getAllCountries = async () => {
            try {
                const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags");
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const data = await response.json();
                const sorted = data.sort((a, b) =>
                    a.name?.common?.localeCompare(b.name?.common)
                );
                setCountries(sorted);
            } catch (error) {
                console.error("Error fetching countries:", error);
                setCountries([]);
            }
        };

        getAllCountries();

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (selectedCountry) => {
        setSearchText(selectedCountry);
        setCountry(selectedCountry);
        setIsDropdownOpen(false);
    };

    const filteredCountries = countries.filter((c) =>
        c.name?.common?.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlertOpen(false);
        setIsSigningUp(true);

        // Determine if the user should be registered as an admin
        const isAdmin = adminKey === SECRET_ADMIN_KEY;

        if (!isMatch) {
            setAlertType("error");
            setAlertMessage("Passwords do not match.");
            setAlertOpen(true);
            setIsSigningUp(false);
            return;
        }

        if (!country) {
            setAlertType("error");
            setAlertMessage("Please select your country.");
            setAlertOpen(true);
            setIsSigningUp(false);
            return;
        }

        try {
            const res = await axios.post("http://localhost:3001/api/auth/signup", {
                userName,
                email,
                password,
                confirmPassword,
                country,
                ref: referralId,
                isAdmin: isAdmin, // We are now sending the isAdmin flag to the backend
            });

            if (res.status === 200 || res.status === 201) {
                setAlertType("success");
                setAlertMessage(res.data.message || "Registration successful! An OTP has been sent to your email.");
                setAlertOpen(true);

                setRegisteredEmail(email);
                setShowOtpVerification(true);
            }
        } catch (err) {
            const msg = err.response?.data?.message || "Unable to reach server.";
            setAlertType("error");
            setAlertMessage(msg);
            setAlertOpen(true);
        } finally {
            setIsSigningUp(false);
        }
    };

    const handleOtpVerificationComplete = () => {
        setAlertType("success");
        setAlertMessage("Account verified successfully! Redirecting to login...");
        setAlertOpen(true);
        setUserName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setCountry('');
        setSearchText('');
        setShowOtpVerification(false);
        setTimeout(() => navigate("/login"), 2000);
    };

    return (
        <div className="flex justify-center min-h-screen items-center bg-white">
            <AlertModal
                open={alertOpen}
                type={alertType}
                message={alertMessage}
                onClose={() => setAlertOpen(false)}
                duration={5000}
            />

            {!showOtpVerification ? (
                <form onSubmit={handleSubmit} className="bg-[#FFE9FE] p-6 rounded-lg shadow-md w-[350px] md:w-[500px]">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-1">Create your account</h1>
                        <p className="text-gray-500 text-sm mb-4">Fill in the details to continue</p>
                    </div>

                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Username"
                        className="w-full mb-3 p-2 border rounded bg-[#FFE6FE] text-sm"
                    />

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full mb-3 p-2 border rounded bg-[#FFE6FE] text-sm"
                    />

                    <div className="relative mb-3">
                        <input
                            type={open ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full p-2 border rounded bg-[#FFE6FE] text-sm"
                        />
                        <div className="absolute top-2.5 right-3 cursor-pointer text-gray-600">
                            {open ? <AiFillEye onClick={() => setOpen(false)} /> : <AiFillEyeInvisible onClick={() => setOpen(true)} />}
                        </div>
                    </div>

                    <div className="relative mb-3">
                        <input
                            type={secondOpen ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            className="w-full p-2 border rounded bg-[#FFE6FE] text-sm"
                        />
                        <div className="absolute top-2.5 right-3 cursor-pointer text-gray-600">
                            {secondOpen ? <AiFillEye onClick={() => setSecondOpen(false)} /> : <AiFillEyeInvisible onClick={() => setSecondOpen(true)} />}
                        </div>
                    </div>

                    <div className="relative mb-3" ref={dropdownRef}>
                        <input
                            type="text"
                            placeholder="Choose Country"
                            value={searchText}
                            onChange={(e) => {
                                setSearchText(e.target.value);
                                setIsDropdownOpen(true);
                            }}
                            onFocus={() => setIsDropdownOpen(true)}
                            className="w-full p-2 border rounded bg-[#FFE6FE] text-sm"
                        />
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 mt-1 z-10 bg-white border rounded shadow-md max-h-48 overflow-y-auto w-full">
                                {filteredCountries.length > 0 ? (
                                    filteredCountries.map((c, i) => (
                                        <div
                                            key={i}
                                            onClick={() => handleSelect(c.name.common)}
                                            className="p-2 hover:bg-[#FFE6FE] flex items-center gap-2 cursor-pointer text-sm"
                                        >
                                            <img src={c.flags.svg} alt="" className="w-4" />
                                            {c.name.common}
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-2 text-gray-400 text-sm">No matches found</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* New button to toggle the admin key field */}
                    <p 
                        className="text-sm text-blue-600 cursor-pointer text-right mb-3"
                        onClick={() => setShowAdminKeyField(!showAdminKeyField)}
                    >
                        {showAdminKeyField ? "Hide admin key field" : "Sign up as an admin?"}
                    </p>

                    {/* New conditional input field for the admin key */}
                    {showAdminKeyField && (
                        <input
                            type="password"
                            value={adminKey}
                            onChange={(e) => setAdminKey(e.target.value)}
                            placeholder="Enter admin key"
                            className="w-full mb-3 p-2 border rounded bg-[#FFE6FE] text-sm"
                        />
                    )}

                    {referralId && (
                        <p className="text-sm text-green-600 mb-3">You were referred by: <strong>{referralId}</strong></p>
                    )}

                    <button
                        type="submit"
                        disabled={!isMatch || isSigningUp}
                        className={`w-full py-2 rounded-full text-white transition flex items-center justify-center ${
                            isMatch && !isSigningUp ? "bg-green-600 hover:bg-green-700" : "bg-[#FF01F7] cursor-not-allowed"
                        }`}
                    >
                        {isSigningUp ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            "SIGN UP"
                        )}
                    </button>
                </form>
            ) : (
                <div className="bg-[#FFE9FE] p-6 rounded-lg shadow-md w-[350px] md:w-[500px]">
                    <OtpVerification
                        email={registeredEmail}
                        onVerificationComplete={handleOtpVerificationComplete}
                    />
                </div>
            )}
        </div>
    );
};

export default Register;
