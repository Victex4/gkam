// =================== IMPORTS ===================
const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const crypto = require("crypto");
const { Resend } = require('resend');
const cookieParser = require("cookie-parser");

// Load environment variables as early as possible
dotenv.config();

// Initialize Resend client
const resendClient = new Resend(process.env.RESEND_API_KEY);

// Import Mongoose Models
const EmployeeModel = require("./models/Employee");
const Payment = require("./models/Payment");
const Task = require("./models/Task");
const UserTask = require("./models/UserTask");

// Import Middleware
const { protect } = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3001;

// =================== MIDDLEWARE ===================
const allowedOrigins = [
    "http://localhost:5173",
    "https://glam-booster.vercel.app",
];

// This CORS configuration is correct for production
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());


// =================== DATABASE ===================
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));


// Define conversion rates on the backend
const conversionRates = {
    GHS: 0.075,
    KES: 0.30,
    USD: 0.00085,
    USDT: 0.00085,
};


// =================== AUTH ROUTES ===================
// All your existing authentication routes...
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
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationTokenExpires = Date.now() + 15 * 60 * 1000;
        const newUser = new EmployeeModel({
            userName,
            email,
            password: hashedPassword,
            country,
            referredBy: ref || null,
            verificationToken,
            verificationTokenExpires,
            isVerified: false,
        });
        await newUser.save();

        const { error } = await resendClient.emails.send({
            from: `Glam Booster <${process.env.SENDER_EMAIL}>`,
            to: [email],
            subject: 'Verify Your Account - Your OTP',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2>Account Verification</h2>
                    <p>Hello ${userName},</p>
                    <p>Thank you for signing up to Glam Booster website! To complete your registration, please use the following One-Time Password (OTP) to verify your account:</p>
                    <p style="font-size: 24px; font-weight: bold; color: #007BFF; text-align: center; background-color: #f0f0f0; padding: 10px; border-radius: 5px;">${verificationToken}</p>
                    <p>This OTP is valid for 15 minutes. Please do not share it with anyone.</p>
                    <p>If you did not request this, please ignore this email.</p>
                    <p>Best regards,<br>Your Team</p>
                </div>
            `,
        });

        if (error) {
            console.error("❌ Resend Email Send Error:", error);
            return res.status(201).json({
                message: "Registration successful, but failed to send verification email. Please contact support.",
            });
        }
        res.status(201).json({
            message: "Registration successful! An OTP has been sent to your email. Please check your inbox and spam folder to verify your account.",
        });
    } catch (err) {
        console.error("❌ Signup Error:", err);
        res.status(500).json({ message: "Server error during signup. Please try again later." });
    }
});

app.post("/api/auth/verify-otp", async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required." });
    }
    try {
        const user = await EmployeeModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        if (user.isVerified) {
            return res.status(400).json({ message: "Account already verified." });
        }
        if (user.verificationToken !== otp) {
            return res.status(400).json({ message: "Invalid OTP." });
        }
        if (Date.now() > user.verificationTokenExpires) {
            user.verificationToken = undefined;
            user.verificationTokenExpires = undefined;
            await user.save();
            return res.status(400).json({ message: "OTP has expired. Please request a new one." });
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;
        await user.save();
        res.status(200).json({ message: "Account verified successfully!" });
    } catch (err) {
        console.error("❌ Backend OTP Verification Error:", err);
        res.status(500).json({ message: "Server error during OTP verification. Please try again later." });
    }
});

app.post("/api/auth/login", async (req, res) => {
    const { userName, password } = req.body;
    try {
        const user = await EmployeeModel.findOne({
            $or: [{ email: userName }, { userName }],
        });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        if (!user.isVerified) {
            return res.status(403).json({ message: "Please verify your email first." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password." });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
                country: user.country,
                createdAt: user.createdAt,
            },
        });
    } catch (err) {
        console.error("❌ Login error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

app.post("/api/auth/forgot-password", async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required." });
    }
    try {
        const user = await EmployeeModel.findOne({ email });
        if (!user) {
            return res.status(200).json({ message: "If an account with that email exists, an OTP has been sent to it." });
        }
        const resetOtp = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetPasswordToken = resetOtp;
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
        await user.save();
        const { error } = await resendClient.emails.send({
            from: `"Glam Booster" <${process.env.SENDER_EMAIL}>`,
            to: [user.email],
            subject: "Your Password Reset OTP",
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2>Password Reset Request</h2>
                    <p>Hello ${user.userName || 'User'},</p>
                    <p>You have requested a password reset. Please use the following One-Time Password (OTP) to verify your request:</p>
                    <p style="font-size: 24px; font-weight: bold; color: #FF5733; text-align: center; background-color: #f0f0f0; padding: 10px; border-radius: 5px;">${resetOtp}</p>
                    <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
                    <p>If you did not request this, please ignore this email.</p>
                    <p>Best regards,<br>Your Team</p>
                </div>
            `,
        });
        if (error) {
            console.error("❌ Resend Password Reset Email Send Error:", error);
            return res.status(500).json({ message: "Failed to send password reset email. Please contact support." });
        }
        res.status(200).json({ message: "If an account with that email exists, an OTP has been sent to it." });
    } catch (err) {
        console.error("❌ Forgot Password Error:", err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

app.post("/api/auth/verify-reset-otp", async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required." });
    }
    try {
        const user = await EmployeeModel.findOne({ email });
        if (!user) {
            return res.status(200).json({ message: "If an account with that email exists, an OTP has been sent." });
        }
        if (!user.resetPasswordToken || !user.resetPasswordExpires) {
            return res.status(400).json({ message: "No active password reset request found for this email." });
        }
        if (user.resetPasswordToken !== otp) {
            return res.status(400).json({ message: "Invalid OTP." });
        }
        if (Date.now() > user.resetPasswordExpires) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
            return res.status(400).json({ message: "OTP has expired. Please request a new one." });
        }
        res.status(200).json({ message: "OTP verified successfully. You can now set your new password." });
    } catch (err) {
        console.error("❌ Backend Verify Reset OTP Error:", err);
        res.status(500).json({ message: "Server error during OTP verification. Please try again later." });
    }
});

app.post("/api/auth/reset-password", async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: "Email, OTP, and new password are required." });
    }
    try {
        const user = await EmployeeModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        if (!user.resetPasswordToken || user.resetPasswordToken !== otp || Date.now() > user.resetPasswordExpires) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
            return res.status(400).json({ message: "Invalid or expired OTP. Please request a new password reset." });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.status(200).json({ message: "Your password has been successfully reset." });
    } catch (err) {
        console.error("❌ Backend Reset Password Error:", err);
        res.status(500).json({ message: "Server error during password reset. Please try again later." });
    }
});


// =================== USER ROUTES ===================
app.get("/api/user/me", protect, async (req, res) => {
    const user = await EmployeeModel.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
});

app.get("/api/user/profile/:id", protect, async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            return res.status(403).json({ message: "Forbidden: You can only access your own profile." });
        }
        const user = await EmployeeModel.findById(req.params.id).select('-password -verificationToken -resetPasswordToken');
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error("❌ Error fetching user profile:", err);
        res.status(500).json({ message: "Server error fetching user profile.", error: err.message });
    }
});


// =================== TASK ROUTES ===================
app.post("/api/tasks", protect, async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: "Task creation failed", details: err.message });
    }
});

app.get("/api/tasks", protect, async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch tasks", details: err.message });
    }
});

app.put("/api/tasks/:id", protect, async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Task.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Failed to update task" });
    }
});

app.delete("/api/tasks/:id", protect, async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete task" });
    }
});


// USER TASK COMPLETION ROUTES
app.post("/api/complete-task", protect, async (req, res) => {
    const { taskId } = req.body;
    const userId = req.user.id;
    if (!userId || !taskId) {
        return res.status(400).json({ message: "Missing userId or taskId" });
    }
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found." });
        }
        const existingRecord = await UserTask.findOne({ userId, taskId });
        if (existingRecord) {
            return res.status(409).json({ message: "Task already completed by this user." });
        }
        const record = await UserTask.create({
            userId,
            taskId,
            completed: true,
            rewardAmount: task.reward
        });
        const user = await EmployeeModel.findById(userId);
        user.balance += task.reward;
        await user.save();
        res.json({ message: "Task marked as complete", record });
    } catch (err) {
        console.error("❌ Failed to mark task complete:", err);
        res.status(500).json({ error: "Failed to mark task complete", details: err.message });
    }
});

app.get("/api/stats", async (req, res) => {
    try {
        const totalOrders = await Payment.countDocuments({ status: "success" });
        const completedTasks = await UserTask.countDocuments({ completed: true });
        const pendingTasks = await UserTask.countDocuments({ completed: false });
        const totalAmountPaid = await Payment.aggregate([
            { $match: { status: "success" } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const availableBalance = totalAmountPaid[0]?.total || 0;
        res.json({
            totalOrders,
            completedTasks,
            pendingTasks,
            availableBalance,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching stats" });
    }
});

app.get("/api/orders", async (req, res) => {
    try {
        const orders = await Payment.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Server error fetching orders" });
    }
});


// =================== PAYMENT ROUTES ===================
app.post("/api/initiate-payment", protect, async (req, res) => {
    const { amount, currency } = req.body;
    const userId = req.user.id;
    if (!amount || !currency) {
        return res.status(400).json({ message: "Amount and currency are required" });
    }
    const reference = `BOOST-${uuidv4()}`;
    try {
        const korapayRes = await axios.post(
            "https://api.korapay.com/merchant/api/v1/checkout",
            { amount: parseFloat(amount), currency, redirect_url: process.env.VITE_FRONTEND_URL + "/dashboard", reference },
            { headers: { Authorization: `Bearer ${process.env.KORAPAY_SECRET_KEY}`, "Content-Type": "application/json" } }
        );
        const { checkout_url } = korapayRes.data.data;
        const newPayment = new Payment({
            userId,
            reference,
            status: "pending",
            amount: parseFloat(amount),
            currency,
        });
        await newPayment.save();
        res.status(200).json({ checkout_url });
    } catch (error) {
        console.error("❌ Korapay error:", error?.response?.data || error.message);
        res.status(500).json({
            message: "Payment initiation failed",
            error: error?.response?.data || error.message
        });
    }
});

app.post("/api/confirm-payment", async (req, res) => {
    const { reference, status } = req.body;
    try {
        const payment = await Payment.findOneAndUpdate(
            { reference },
            { status },
            { new: true }
        );
        if (payment) {
            console.log(`Payment with reference ${reference} updated to status: ${status}`);
            return res.status(200).json({ message: "Payment confirmed successfully." });
        } else {
            return res.status(404).json({ message: "Payment reference not found." });
        }
    } catch (err) {
        console.error("❌ Error confirming payment:", err);
        res.status(500).json({ message: "Server error confirming payment." });
    }
});

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

app.post("/api/cryptomus-payment", protect, async (req, res) => {
    const { amount, currency } = req.body;
    const userId = req.user.id;
    if (!amount || !currency) {
        return res.status(400).json({ message: "Missing required payment details." });
    }
    const cryptomusApiKey = process.env.CRYPTOMUS_API_KEY;
    const cryptomusMerchantId = process.env.CRYPTOMUS_MERCHANT_ID;
    if (!cryptomusApiKey || !cryptomusMerchantId) {
        console.error("Cryptomus API keys not configured.");
        return res.status(500).json({ message: "Cryptomus payment gateway not configured." });
    }
    try {
        let amountInTargetCurrency = parseFloat(amount);
        if (currency === "NGN") {
            const rate = conversionRates['USDT'];
            if (!rate) {
                return res.status(400).json({ message: "Invalid currency for conversion to USDT." });
            }
            amountInTargetCurrency = amount * rate;
        }
        const orderId = `order_${uuidv4()}`;
        const cryptomusPayload = {
            amount: amountInTargetCurrency.toFixed(2),
            currency: "USD",
            order_id: orderId,
            url_return: `${process.env.VITE_FRONTEND_URL}/payment-success`,
            url_success: `${process.env.VITE_FRONTEND_URL}/payment-success`,
            url_failure: `${process.env.VITE_FRONTEND_URL}/payment-fail`,
        };
        const signature = crypto.createHash('md5')
            .update(Buffer.from(JSON.stringify(cryptomusPayload)).toString('base64') + cryptomusApiKey)
            .digest('hex');
        const cryptomusResponse = await axios.post('https://api.cryptomus.com/v1/payment', cryptomusPayload, {
            headers: {
                'Content-Type': 'application/json',
                'merchant': cryptomusMerchantId,
                'sign': signature
            }
        });
        if (cryptomusResponse.data?.result?.url) {
            const newPayment = new Payment({
                userId,
                reference: orderId,
                status: "pending",
                amount: parseFloat(amount),
                currency,
                gateway: 'cryptomus',
                externalId: cryptomusResponse.data.result.uuid
            });
            await newPayment.save();
            res.status(200).json({
                message: "Cryptomus payment initiated.",
                paymentUrl: cryptomusResponse.data.result.url,
                orderId
            });
        } else {
            console.error("Cryptomus API response error:", cryptomusResponse.data);
            res.status(500).json({ message: "Failed to initiate Cryptomus payment. Invalid response from gateway." });
        }
    } catch (error) {
        console.error("❌ Cryptomus payment error:", error.response?.data || error.message);
        res.status(500).json({ message: "Server error initiating Cryptomus payment.", error: error.message });
    }
});

app.post("/api/paypal-payment", protect, async (req, res) => {
    const { amount, currency } = req.body;
    const userId = req.user.id;
    if (!amount || !currency) {
        return res.status(400).json({ message: "Missing required payment details." });
    }
    const paypalClientId = process.env.PAYPAL_CLIENT_ID;
    const paypalSecret = process.env.PAYPAL_SECRET;
    const paypalApiBaseUrl = process.env.PAYPAL_API_BASE_URL || 'https://api-m.sandbox.paypal.com';
    if (!paypalClientId || !paypalSecret) {
        return res.status(500).json({ message: "PayPal payment gateway not configured." });
    }
    try {
        const authString = Buffer.from(`${paypalClientId}:${paypalSecret}`).toString('base64');
        const tokenResponse = await axios.post(`${paypalApiBaseUrl}/v1/oauth2/token`,
            'grant_type=client_credentials',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${authString}`
                }
            }
        );
        const accessToken = tokenResponse.data.access_token;
        const paypalOrderPayload = {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: currency,
                    value: parseFloat(amount).toFixed(2)
                }
            }],
            application_context: {
                return_url: `${process.env.VITE_FRONTEND_URL}/payment-success`,
                cancel_url: `${process.env.VITE_FRONTEND_URL}/payment-fail`,
            }
        };
        const orderResponse = await axios.post(`${paypalApiBaseUrl}/v2/checkout/orders`,
            paypalOrderPayload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        );
        const approvalUrl = orderResponse.data.links.find(link => link.rel === 'approve').href;
        const orderId = orderResponse.data.id;
        const newPayment = new Payment({
            userId,
            reference: orderId,
            status: 'pending',
            amount: parseFloat(amount),
            currency,
            gateway: 'paypal'
        });
        await newPayment.save();
        res.status(200).json({
            message: "PayPal payment initiated.",
            approvalUrl,
            orderId
        });
    } catch (error) {
        console.error("❌ PayPal payment error:", error.response?.data || error.message);
        res.status(500).json({ message: "Server error initiating PayPal payment.", error: error.message });
    }
});


// REFERRALS ROUTES
app.use("/api/referrals", require("./routes/referrals"));

// ADMIN AUTH ROUTES
app.use("/api/admin", require("./routes/adminAuth"));


// =================== LOCAL SERVER ===================
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`🚀 Local server running at http://localhost:${PORT}`);
    });
}

// =================== EXPORT for VERCEL ===================
module.exports = app;
module.exports.handler = serverless(app);
 