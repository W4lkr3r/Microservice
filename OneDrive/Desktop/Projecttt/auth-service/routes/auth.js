const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Import your model
const jwt = require('jsonwebtoken');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // TODO 1: Check if user already exists (use User.findOne({ email }))
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // TODO 2: If user exists, return res.status(400).json({ message: 'User already exists' })

        // TODO 3: Hash the password using bcrypt.hash(password, 10)
        const pass = await bcrypt.hash(password, 10);

        // TODO 4: Create a new User object with the hashed password
        const userr = new User({
            username,
            email,
            password: pass,
            role: 'user'
        })

        // TODO 5: Save the user to DB (await user.save())
        await userr.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
})

module.exports = router;
