import React, { useEffect, useState } from "react";
import axios from "axios";

const VerifyEmail = () => {
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setStatus("❌ Invalid or missing verification token.");
      return;
    }

    axios.get(`${import.meta.env.VITE_API}/api/auth/verify-email?token=${token}`)
      .then((res) => {
        setStatus("✅ Email Verified! You can now log in.");
      })
      .catch((err) => {
        if (err.response && err.response.data.message) {
          setStatus(`❌ ${err.response.data.message}`);
        } else {
          setStatus("❌ Verification failed. Please try again.");
        }
      });
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-200 to-pink-200">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
