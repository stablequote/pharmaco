const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // Import User schema

// User registration
exports.register = async (req, res) => {
    try {
        const { name, username, password, role, branch } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            username,
            password: hashedPassword,
            role,
            branch,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed.' });
        console.log(error);
    }
};

// Generate tokens
const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '15m' } // Short-lived access token
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' } // Long-lived refresh token
    );
};

// User login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: 'User not found.' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials.' });

        // Generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Store refresh token in the database or send as httpOnly cookie
        user.refreshToken = refreshToken; // Add refreshToken field to your User schema if not already there
        await user.save();

        res
            .status(200)
            .cookie('refreshToken', refreshToken, {
                httpOnly: true, // Prevent XSS
                secure: true, // Use HTTPS
                sameSite: 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            })
            .json({ message: 'Login successful.', accessToken });
    } catch (error) {
        res.status(500).json({ error: 'Login failed.' });
    }
};

// Refresh token endpoint
exports.refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken; // Ensure you use cookies-parser middleware
        if (!refreshToken) return res.status(403).json({ error: 'Refresh token not provided.' });

        const user = await User.findOne({ refreshToken });
        if (!user) return res.status(403).json({ error: 'Invalid refresh token.' });

        // Verify the refresh token
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ error: 'Invalid refresh token.' });

            const newAccessToken = generateAccessToken(user);
            res.status(200).json({ accessToken: newAccessToken });
        });
    } catch (error) {
        res.status(500).json({ error: 'Could not refresh token.' });
    }
};

// Logout endpoint
exports.logout = async (req, res) => {
    try {
        const user = await User.findOne({ refreshToken: req.cookies.refreshToken });
        if (!user) return res.status(204).send(); // No content

        user.refreshToken = null; // Clear the stored refresh token
        await user.save();

        res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'Strict' });
        res.status(200).json({ message: 'Logged out successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Logout failed.' });
    }
};
