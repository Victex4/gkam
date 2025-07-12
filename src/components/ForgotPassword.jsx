// ===== src/pages/ForgotPassword.jsx =====
import React, { useState } from 'react';
import Alert from '../components/Alert.jsx';
import ForgotPassPopUp from '../components/ForgotPassPopUp';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [alertType, setAlertType] = useState('');
  const [msg, setMsg] = useState('');
  const [forgotPassPopUp, setForgotPassPopUp] = useState(false);
  const [showCheckEmailModal, setShowCheckEmailModal] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) {
      setMsg('Please fill in all fields');
      setAlertType('error');
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        setMsg('Email does not exist');
        setAlertType('error');
      } else {
        // ✅ Show your ForgotPassPopUp first
        setForgotPassPopUp(true);
      }
    } catch (err) {
      setMsg('Something went wrong');
      setAlertType('error');
    }
  }

  // ✅ When ForgotPassPopUp closes, show "Check your email" modal
  const handleForgotPassPopUpClose = () => {
    setForgotPassPopUp(false);
    setShowCheckEmailModal(true);
  };

  return (
    <div>
      <div className="flex justify-center min-h-[100vh] items-center bg-white">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center ">
            <img src="/logo.svg" className="w-16" alt="" />
          </div>
          <div className="text-2xl font-Poppins py-4 font-bold text-black flex justify-center">
            Recover Your Account
          </div>
          <div className="w-[350px] md:w-[450px] shadow-md bg-[#FFE9FE] rounded-[12px] py-[30px] px-[40px]">
            {msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType} />}
            <div>
              <h1 className="text-[18px] font-Poppins text-center text-2xl font-bold">
                Forgot Password?
              </h1>
              <p className="font-Poppins pt-1 pb-[2rem] text-center text-sm text-gray-400">
                Fill in the Details to Continue
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
              Recover Password
            </button>
          </div>
        </form>
      </div>

      {/* ✅ Forgot Password PopUp */}
      <ForgotPassPopUp
        forgotPassPopUp={forgotPassPopUp}
        setForgotPassPopUp={handleForgotPassPopUpClose}
      />

      {/* ✅ Fancy Check Email Modal */}
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
      )}
    </div>
  );
};

export default ForgotPassword;
