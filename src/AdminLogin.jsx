import React, { useState } from "react";
import axios from "axios";

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/admin/login", { email, password });
      onLogin(res.data); // you can store token and user
      alert("Admin logged in!");
    } catch (err) {
      alert(err.response?.data?.message || "Admin login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login as Admin</button>
    </form>
  );
};

export default AdminLogin;
