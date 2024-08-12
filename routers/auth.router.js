const express = require('express');
const { authenticateToken } = require('../shared/auth/jwt.authentication');
const { registerUser, loginUser, logoutUser } = require('../services/user/user.services');
const { AUTH_RESPONSE_MESSAGE } = require('../constants/message');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        const acknowledge = await registerUser({ name, email, password, phone });
        if (acknowledge) {
            res.status(201).send({
                message: AUTH_RESPONSE_MESSAGE.CREATED
            });
        } else {
            res.status(400).send({
                message: AUTH_RESPONSE_MESSAGE.ALREADY_EXISTS
            });
        }
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).send({
            message: AUTH_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
        });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await loginUser({ email, password });
        if (token) {
            res.status(200).send({
                token: token,
                message: AUTH_RESPONSE_MESSAGE.SUCCESS
            });
        } else {
            res.status(400).send({
                message: AUTH_RESPONSE_MESSAGE.ERROR
            });
        }
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).send({
            message: AUTH_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
        });
    }
});

router.post('/logout', authenticateToken, async (req, res) => {
    const user = req.user;
    const email = user.email;
    console.log('Email inside Logout function', email);

    try {
        const acknowledge = await logoutUser({ email });
        if (acknowledge) {
            res.status(200).send({
                message: AUTH_RESPONSE_MESSAGE.LOGOUT_SUCCESS
            });
        } else {
            res.status(400).send({
                message: AUTH_RESPONSE_MESSAGE.LOGOUT_ERROR
            });
        }
    } catch (error) {
        console.error('Logout Error:', error);
        res.status(500).send({
            message: AUTH_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
        });
    }
});

router.get('/', authenticateToken, (req, res) => {
    const user = req.user;
    res.send(`Welcome to the authentication router, ${user.name}`);
});

module.exports = router;
