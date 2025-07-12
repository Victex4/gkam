// =================== IMPORTS ===================
const express = require("express");
const serverless = require("serverless-http"); // ✅ For Vercel
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const EmployeeModel = require("./models/Employee");
const Payment = require("./models/Payment");
const Task = require("./models/Task");
const UserTask = require("./models/UserTask");
const authenticateToken = require("./middleware/authMiddleware");
const referralRoutes = require("./routes/referrals");
const adminAuthRoutes = require("./routes/adminAuth");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// =================== MIDDLEWARE ===================
const allowedOrigins = [
  "http://localhost:5173",
  "https://glam-booster.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/referrals", referralRoutes);
app.use("/api/admin", adminAuthRoutes);


// =================== DATABASE ===================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// =================== AUTH ROUTES ===================

// ✅ SIGN UP
app.post("/api/auth/signup", async (req, res) => {
  const { userName, email, password, confirmPassword, country, ref } = req.body;
  if (!userName || !email || !password || !confirmPassword || !country) {
    return res.status(400).json({ message: "All fields are required." });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    const existingUser = await EmployeeModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = new EmployeeModel({
      userName,
      email,
      password: hashedPassword,
      country,
      referredBy: ref || null,
      verificationToken,
      verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000,
      isVerified: false,
    });

    await newUser.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

    await transporter.sendMail({
      from: `"Glam Booster" <${process.env.EMAIL_USER}>`,
      to: newUser.email,
      subject: "Verify Your Email",
      html: `<h3>Verify your email</h3>
      <p>Click the link below to verify your account:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>`,
    });

    res.status(201).json({
      message: "Registration successful! Please check your email to verify your account.",
    });
  } catch (err) {
    console.error("❌ Signup Error:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;

  const admin = await EmployeeModel.findOne({ email, role: "admin" });
  if (!admin) return res.status(404).json({ message: "Admin not found." });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: "Incorrect password." });

  const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.status(200).json({
    message: "Admin login successful",
    token,
    user: {
      id: admin._id,
      userName: admin.userName,
      email: admin.email,
      role: admin.role,
    },
  });
});


// ✅ VERIFY EMAIL
app.get("/verify-email", async (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(400).json({ message: "Invalid token" });

  try {
    const user = await EmployeeModel.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Token invalid or expired." });

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.send("<h2>Email Verified ✅</h2><p>You can now log in!</p>");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Verification failed" });
  }
});

// ✅ LOGIN
app.post("/api/auth/login", async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await EmployeeModel.findOne({
      $or: [{ email: userName }, { userName }],
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.isVerified) return res.status(403).json({ message: "Please verify your email first." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        country: user.country,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

// ✅ FORGOT PASSWORD
app.post("/api/auth/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const user = await EmployeeModel.findOne({ email });
  if (!user) return res.status(404).json({ message: "Email not found" });

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000;
  await user.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  const resetUrl = `http://localhost:5173/recover-password?token=${resetToken}`;

  await transporter.sendMail({
    from: `"Glam Booster" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: "Password Reset",
    html: `<p>You requested a password reset.</p>
           <p>Click this link to reset: <a href="${resetUrl}">${resetUrl}</a></p>`,
  });

  res.status(200).json({ message: "Password reset email sent" });
});

// ✅ RESET PASSWORD
app.post("/api/auth/reset-password", async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) return res.status(400).json({ message: "Invalid request" });

  const user = await EmployeeModel.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ message: "Token invalid or expired" });

  const hashed = await bcrypt.hash(password, 10);
  user.password = hashed;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();
  res.status(200).json({ message: "Password reset successful" });
});

// ✅ USER ROUTES
app.get("/api/user/me", authenticateToken, async (req, res) => {
  const user = await EmployeeModel.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// Add your update user/email/country/password routes here (same as you wrote them)

// ✅ TASK ROUTES
// =================== TASK ROUTES ===================

// Add new task (Admin usage, optional)
app.post("/task", async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: "Task creation failed", details: err.message });
  }
});

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks", details: err.message });
  }
});

// ✅ Update task
app.put("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// ✅ Delete task
app.delete("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});



// Mark task as complete
app.post("/complete-task", async (req, res) => {
  const { userId, taskId } = req.body;

  if (!userId || !taskId) {
    return res.status(400).json({ message: "Missing userId or taskId" });
  }

  try {
    const record = await UserTask.findOneAndUpdate(
      { userId, taskId },
      { completed: true },
      { upsert: true, new: true }
    );
    res.json({ message: "Task marked as complete", record });
  } catch (err) {
    res.status(500).json({ error: "Failed to mark task complete", details: err.message });
  }
});


// ✅ KORAPAY PAYMENT
app.post("/api/initiate-payment", async (req, res) => {
  const { name, email, amount, currency } = req.body;
  if (!name || !email || !amount || !currency) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const reference = `BOOST-${Date.now()}`;
  const payload = {
    amount: parseFloat(amount),
    currency,
    redirect_url: "http://localhost:5173/dashboard",
    customer: { name, email },
    reference,
  };

  try {
    const korapayRes = await axios.post(
      "https://api.korapay.com/merchant/api/v1/checkout",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.KORAPAY_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { checkout_url } = korapayRes.data.data;
    await new Payment({ reference, status: "pending", amount: parseFloat(amount) }).save();
    res.status(200).json({ checkout_url });
  } catch (error) {
    console.error("❌ Korapay error:", error?.response?.data || error.message);
    res.status(500).json({ message: "Payment initiation failed", error: error?.response?.data || error.message });
  }
});

// ✅ GLAM BOOSTER
app.post("/api/glam/place-order", async (req, res) => {
  const { service, link, quantity } = req.body;
  if (!service || !link || !quantity) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const payload = {
      key: process.env.GLAM_API_KEY,
      action: "add",
      service,
      link,
      quantity,
    };
    const response = await axios.post("https://exosupplier.com/api/v2", payload);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("❌ Glam Booster Order Error:", error.message);
    res.status(500).json({ message: "Failed to place Glam Booster order." });
  }
});

// ✅ REFERRALS (already handled by your routes/referrals.js)
app.get("/api/referrals", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const referrals = await EmployeeModel.find({ referredBy: userId }).sort({ createdAt: -1 });

  const registrationCount = referrals.length;
  const totalReward = registrationCount * 500;
  const available = registrationCount >= 10 ? totalReward : 0;

  res.json({
    referrals,
    registrationCount,
    totalReward,
    available,
  });
});

// =================== LOCAL SERVER ===================
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Local server running at http://localhost:${PORT}`);
  });
}

// =================== EXPORT for VERCEL ===================
module.exports = app;
module.exports.handler = serverless(app);
