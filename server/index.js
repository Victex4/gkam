// server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const EmployeeModel = require("./models/Employee");
const Payment = require("./models/Payment");
const Task = require("./models/Task");
const UserTask = require("./models/UserTask");
const authenticateToken = require("./middleware/authMiddleware");
const referralRoutes = require("./routes/referrals");
const crypto = require("crypto");
const nodemailer = require("nodemailer");


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/api/referrals", referralRoutes);

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true, useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


// =================== AUTH ROUTES ===================

// ✅ SIGN UP with email verification
// ✅ Sign Up route with clear error messages
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
      verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      isVerified: false,
    });

    await newUser.save();

    // ✅ Send verification email
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
      html: `
        <h3>Verify your email</h3>
        <p>Click the link below to verify your account:</p>
        <a href="${verifyUrl}">${verifyUrl}</a>
      `,
    });

    res.status(201).json({
      message: "Registration successful! Please check your email to verify your account.",
    });

  } catch (err) {
    console.error("❌ Signup Error:", err);

    // ✅ Improved error message for frontend modal
    if (err.code === 'EAUTH') {
      return res.status(500).json({
        message: "Could not send verification email. Invalid email credentials. Check your EMAIL_USER and App Password."
      });
    }

    res.status(500).json({
      message: "Server error. Please try again later."
    });
  }
});


// ✅ Email Verification
app.get("/verify-email", async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Invalid token" });
  }

  try {
    const user = await EmployeeModel.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Token invalid or expired." });
    }

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

// ✅ Login
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

// ✅ Forgot Password
app.post("/api/auth/forgot-password", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  const user = await EmployeeModel.findOne({ email });
  if (!user) return res.status(404).json({ message: "Email not found" });

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
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


// ✅ Get logged-in user (with token)
app.get("/api/user/me", authenticateToken, async (req, res) => {
  try {
    const user = await EmployeeModel.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user data" });
  }
});

// ✅ Get user profile by ID
app.get("/api/user/profile/:id", async (req, res) => {
  try {
    const user = await EmployeeModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({
      id: user._id,
      userName: user.userName,
      email: user.email,
      country: user.country,
      referredBy: user.referredBy,
      createdAt: user.createdAt,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update email
app.put("/api/user/update-email/:id", async (req, res) => {
  try {
    const { email } = req.body;
    await EmployeeModel.findByIdAndUpdate(req.params.id, { email });
    res.json({ message: "Email updated" });
  } catch {
    res.status(500).json({ message: "Error updating email" });
  }
});

// ✅ Update username
app.put("/api/user/update-username/:id", async (req, res) => {
  try {
    const { userName } = req.body;
    await EmployeeModel.findByIdAndUpdate(req.params.id, { userName });
    res.json({ message: "Username updated" });
  } catch {
    res.status(500).json({ message: "Error updating username" });
  }
});

// ✅ Update country
app.put("/api/user/update-country/:id", async (req, res) => {
  try {
    const { country } = req.body;
    await EmployeeModel.findByIdAndUpdate(req.params.id, { country });
    res.json({ message: "Country updated" });
  } catch {
    res.status(500).json({ message: "Error updating country" });
  }
});

// ✅ Update password
app.put("/api/user/update-password/:id", async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await EmployeeModel.findById(req.params.id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: "Password updated" });
  } catch {
    res.status(500).json({ message: "Error updating password" });
  }
});


// =================== TASK ROUTES ===================
app.post("/task", async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: "Task creation failed", details: err.message });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks", details: err.message });
  }
});

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
    res.json({ message: "Task completed", record });
  } catch (err) {
    res.status(500).json({ error: "Failed to update", details: err.message });
  }
});


// =================== KORAPAY PAYMENT ===================
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

    const payment = new Payment({ reference, status: "pending", amount: parseFloat(amount) });
    await payment.save();

    res.status(200).json({ checkout_url });
  } catch (error) {
    console.error("❌ Korapay error:", error?.response?.data || error.message);
    res.status(500).json({
      message: "Payment initiation failed",
      error: error?.response?.data || error.message,
    });
  }
});

app.post("/api/confirm-payment", async (req, res) => {
  const { reference } = req.body;

  if (!reference) {
    return res.status(400).json({ message: "Reference is required" });
  }

  try {
    const response = await axios.get(
      `https://api.korapay.com/merchant/api/v1/transactions/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.KORAPAY_SECRET_KEY}`,
        },
      }
    );

    const transaction = response?.data?.data;

    if (transaction?.status === "success") {
      await Payment.findOneAndUpdate(
        { reference },
        { status: transaction.status, amount: transaction.amount, customer: transaction.customer },
        { upsert: true }
      );
      return res.status(200).json({ message: "Payment verified", transaction });
    } else {
      return res.status(400).json({ message: "Payment not successful", status: transaction?.status });
    }
  } catch (error) {
    console.error("❌ KoraPay verification failed:", error?.response?.data || error.message);
    return res.status(500).json({
      message: "Error verifying payment",
      error: error?.response?.data || error.message,
    });
  }
});

// =================== GLAM BOOSTER ===================
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

// =================== REFERRALS ===================
app.get("/api/referrals", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const referrals = await EmployeeModel.find({ referredBy: userId }).sort({ createdAt: -1 });

    const registrationCount = referrals.length;
    const totalReward = registrationCount * 500;
    const available = registrationCount >= 10 ? totalReward : 0; // Example logic

    res.json({
      referrals,
      registrationCount,
      totalReward,
      available,
    });
  } catch (err) {
    console.error("Referral fetch error:", err.message);
    res.status(500).json({ message: "Error fetching referrals" });
  }
});


// =================== SERVER ===================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
