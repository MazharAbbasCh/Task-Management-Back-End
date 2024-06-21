const express = require('express');
const User = require('../model/UserSchema');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (e) {
        res.status(500).json({ success: false, message: 'User registration failed' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
        res.status(200).json({ success: true, message: 'Login successful', userId: user._id });
    } catch (e) {
        res.status(500).json({ success: false, message: 'Login failed' });
    }
});

module.exports = router;
