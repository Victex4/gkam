import React, { useState } from "react";
import axios from "axios";

const AdminSignUp = () => {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    secretCode: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/admin/signup", form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error signing up admin");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="userName" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} />
      <input name="secretCode" placeholder="Admin Secret Code" onChange={handleChange} />
      <button type="submit">Create Admin</button>
    </form>
  );
};

export default AdminSignUp;
