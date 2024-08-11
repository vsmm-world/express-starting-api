const express = require('express');
const { authenticateToken } = require('../shared/auth/jwt.authentication');
const { registerUser } = require('../services/user/user.services');
const router = express.Router();


router.post('/register', async (req, res) => {

    const { name, email, password, phone } = req.body;
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password', password);
    console.log('Phone:', phone);

    const acknowledge = await registerUser({ name, email, password, phone });

    if (acknowledge) {
        res.status(201).send('User registered successfully');
    } else {
        res.status(400).send('User registration failed');
    }

});

router.post('/login', (req, res) => {
    res.send('Login route');
});

router.get('/', authenticateToken, (req, res) => {
    const user = req.user;
    res.send(`Welcome to the authentication router, ${user.name}`);

});

module.exports = router;

