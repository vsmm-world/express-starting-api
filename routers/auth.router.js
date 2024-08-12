const express = require('express');
const { authenticateToken } = require('../shared/auth/jwt.authentication');
const { registerUser, loginUser, logoutUser } = require('../services/user/user.services');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        const acknowledge = await registerUser({ name, email, password, phone });
        if (acknowledge) {
            res.status(201).send('User registered successfully');
        } else {
            res.status(400).send('User registration failed');
        }
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).send('Server error during registration');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await loginUser({ email, password });
        if (token) {
            res.status(200).send({
                token: token,
                message: 'User logged in successfully'
            });
        } else {
            res.status(400).send('User login failed');
        }
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).send('Server error during login');
    }
});

router.post('/logout', authenticateToken, async (req, res) => {
    const user = req.user;
    const email = user.email;

    try {
        const acknowledge = await logoutUser({ email });
        if (acknowledge) {
            res.status(200).send('User logged out successfully');
        } else {
            res.status(400).send('User logout failed');
        }
    } catch (error) {
        console.error('Logout Error:', error);
        res.status(500).send('Server error during logout');
    }
});

router.get('/', authenticateToken, (req, res) => {
    const user = req.user;
    res.send(`Welcome to the authentication router, ${user.name}`);
});

module.exports = router;
