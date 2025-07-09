// ✅ This is your corrected Register.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import AlertModal from './components/AlertModal.jsx';
import axios from 'axios';

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [open, setOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const referralId = queryParams.get('ref') || null;
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("error"); // 'error' | 'success' | 'info'
  const [alertMessage, setAlertMessage] = useState("");

  const isMatch = password && confirmPassword && password === confirmPassword;

  useEffect(() => {
    const getAllCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags"
        );
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
  setError("");
  setSuccess("");

  if (!isMatch) {
    setAlertType("error");
    setAlertMessage("Passwords do not match.");
    setAlertOpen(true);
    return setError("Passwords do not match.");
  }

  if (!country) {
    setAlertType("error");
    setAlertMessage("Please select your country.");
    setAlertOpen(true);
    return setError("Please select your country.");
  }

  try {
    const res = await axios.post("http://localhost:3001/api/auth/signup", {
      userName,
      email,
      password,
      confirmPassword,
      country,
      ref: referralId,
    });

    if (res.status === 200 || res.status === 201) {
      setAlertType("success");
      setAlertMessage(res.data.message || "Registration successful! Please check your email.");
      setAlertOpen(true);

      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    }
  } catch (err) {
    if (err.response) {
      const msg = err.response.data.message || "Something went wrong.";
      setAlertType("error");
      setAlertMessage(msg);
      setAlertOpen(true);
      setError(msg);
    } else {
      setAlertType("error");
      setAlertMessage("Unable to reach server.");
      setAlertOpen(true);
      setError("Unable to reach server.");
    }
  }
};


  return (
    <div className="flex justify-center min-h-screen items-center bg-white">
    <AlertModal
      open={alertOpen}
      type={alertType}
      message={alertMessage}
      onClose={() => setAlertOpen(false)}
      duration={5000} // 5s auto-close
/>
      <form onSubmit={handleSubmit} className="bg-[#FFE9FE] p-6 rounded-lg shadow-md w-[350px] md:w-[500px]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-1">Create your account</h1>
          <p className="text-gray-500 text-sm mb-4">Fill in the details to continue</p>
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

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

        {referralId && (
          <p className="text-sm text-green-600 mb-3">You were referred by: <strong>{referralId}</strong></p>
        )}

        <button
          type="submit"
          disabled={!isMatch}
          className={`w-full py-2 rounded-full text-white transition ${
            isMatch ? "bg-green-600 hover:bg-green-700" : "bg-[#FF01F7] cursor-not-allowed"
          }`}
        >
          SIGN UP
        </button>
      </form>
    </div>
  );
};

export default Register;
