const express = require('express'); // Import Express
const User = require('../models/User'); // Import User model
const bcrypt = require('bcrypt'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For authentication
const { authMiddleware } = require('../middlewares/authMiddleware'); // ✅ Correct import
const router = express.Router(); // Initialize router

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Ensure SECRET_KEY is defined

// API to register new user
router.post('/add', async(req, res) => {
    try {
        const { name, password, email } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, password: hashedPassword, email });
        await newUser.save();

        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Login API with JWT
router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id, email: user.email },
            SECRET_KEY, { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Protected Route - Get User Profile
router.get('/profile', authMiddleware, async(req, res) => {
    try {
        res.json({ message: 'This is a protected route', user: req.user });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET user by email
router.get('/user', authMiddleware, async(req, res) => {
    try {
        const { email } = req.query; // Get email from query params

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const user = await User.findOne({ email }); // Find user by email  karan1@example.com

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user); // Return user details
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Update user password by email
router.put('/update-password', authMiddleware, async(req, res) => {
    try {
        const { email, password } = req.body; // Use `req.body` for sensitive data

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user's password
        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});
module.exports = router; // Export router for use in index.js