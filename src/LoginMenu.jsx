// ===== src/components/LoginMenu.jsx (React frontend) =====
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./section/Nav";

const LoginMenu = ({ menuOpen, setMenuOpen }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setOpen(!open);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedUser = userName.trim();
    const trimmedPass = password.trim();
    if (!trimmedUser || !trimmedPass) {
      toast.error("Username and password are required!");
      return;
    }

    axios
      .post("http://localhost:3001/login", {
        userName: trimmedUser,
        password: trimmedPass,
      })
      .then((res) => {
        const { message, user, token } = res.data;

        if (message === "Login successful") {
          toast.success("Login successful!");

          // ✅ ✅ ✅ STORE user and token in localStorage
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", token);

          setTimeout(() => navigate("/dashboard"), 1500);
        } else {
          toast.error(message);
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        if (err.response?.data?.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Server error. Please try again.");
        }
      });
  };

  return (
    <div className={``}>
      <Header setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <div
        className={`flex justify-center ${
          menuOpen ? "px-10 blur-sm" : ""
        } min-h-screen items-center bg-white`}
      >
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div className="text-2xl font-Poppins py-4 font-bold text-white text-center">
            LOG IN HERE
          </div>
          <div className="w-[350px] md:w-[450px] bg-[#FFE9FE] rounded-[12px] py-[30px] px-[40px] shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            <div>
              <h1 className="text-2xl font-bold text-center text-gray-800 font-Poppins">
                Get Started
              </h1>
              <p className="font-Poppins pt-1 pb-8 text-center text-sm text-gray-400">
                Fill in the Details to Continue
              </p>
            </div>

            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
              className="w-full mb-4 bg-[#FFE6FE] border rounded px-4 py-2 text-black shadow focus:outline-none focus:border-[#28a745]"
            />

            <div className="relative">
              <input
                type={open ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-[#FFE6FE] border rounded px-4 py-2 text-black shadow focus:outline-none focus:border-[#28a745]"
              />
              <div className="absolute top-3 right-5 text-xl cursor-pointer">
                {open ? (
                  <AiFillEye onClick={toggle} />
                ) : (
                  <AiFillEyeInvisible onClick={toggle} />
                )}
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#FF01F7] text-white w-full py-2 rounded-full mt-6 hover:scale-105 duration-150"
            >
              LOGIN
            </button>

            <div className="flex justify-between mt-4 text-sm">
              <p
                className="cursor-pointer text-gray-600 hover:text-[#FF01F7]"
                onClick={() => navigate(`/register`)}
              >
                Don't have an account?
              </p>
              <p
                className="cursor-pointer text-[#FF01F7] hover:text-gray-600"
                onClick={() => navigate(`/forgot-password`)}
              >
                Forgot Password?
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginMenu;
